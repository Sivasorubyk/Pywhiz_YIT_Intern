from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import (
    Milestone, LearnContent, CodeQuestion,
    UserCodeAnswer, MCQQuestion, UserMCQAnswer,
    UserProgress, PersonalizedExercise
)
from .serializers import (
    MilestoneSerializer, LearnContentSerializer, CodeQuestionSerializer,
    UserCodeAnswerSerializer, MCQQuestionSerializer, UserMCQAnswerSerializer,
    UserProgressSerializer, PersonalizedExerciseSerializer
)
from user.models import User
import requests
import openai
import json
import logging
import os
from django.conf import settings

logger = logging.getLogger(__name__)

openai.api_key = os.getenv('OPENAI_API_KEY')

from googletrans import Translator

def translate_to_tamil(text):
    """Translate text to Tamil if it's not already in Tamil"""
    try:
        translator = Translator()
        detected_lang = translator.detect(text).lang
        if detected_lang != 'ta':  # If not Tamil
            translated = translator.translate(text, dest='ta')
            return translated.text
        return text
    except Exception as e:
        logger.error(f"Translation error: {str(e)}")
        return text  # Return original if translation fails

class MilestoneListView(generics.ListAPIView):
    queryset = Milestone.objects.filter(is_active=True).order_by('order')
    serializer_class = MilestoneSerializer
    permission_classes = [permissions.IsAuthenticated]

class LearnContentView(generics.RetrieveAPIView):
    serializer_class = LearnContentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        milestone_id = self.kwargs.get('milestone_id')
        return LearnContent.objects.get(milestone_id=milestone_id)

class CodeQuestionView(generics.ListAPIView):
    serializer_class = CodeQuestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        milestone_id = self.kwargs.get('milestone_id')
        return CodeQuestion.objects.filter(milestone_id=milestone_id)

class SubmitCodeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, question_id):
        try:
            question = CodeQuestion.objects.get(id=question_id)
            user = request.user
            user_code = request.data.get("code", "")
            user_inputs = request.data.get("inputs", [])  # List of inputs for input() calls

            if not user_code:
                return Response({"error": "No code provided"}, status=400)

            # 🧪 1. Execute the code using Piston with input support
            piston_payload = {
                "language": "python3",
                "version": "3.10.0",
                "files": [{"name": "main.py", "content": user_code}],
                
            }
            
            # Add stdin if there are user inputs
            if user_inputs:
                piston_payload["stdin"] = "\n".join(user_inputs) + "\n"

            piston_response = requests.post(
                settings.PISTON_EXECUTE_URL,
                json=piston_payload,
                timeout=10  # Add timeout to prevent hanging
            )

            if piston_response.status_code != 200:
                return Response({"error": "Code execution failed"}, status=500)

            result = piston_response.json().get("run", {})
            stdout = result.get("stdout", "").strip()
            stderr = result.get("stderr", "").strip()

            # Translate error messages to Tamil
            if stderr:
                stderr = translate_to_tamil(stderr)

            # Check if the program is waiting for input
            if "EOFError: EOF when reading a line" in stderr:
                translated_message = translate_to_tamil("This program requires input")
                return Response({
                    "status": "input_required",
                    "message": translated_message,
                    "stdout_so_far": stdout  # Keep stdout in original language
                }, status=200)

            # 🧠 2. Call OpenAI with the real output
            prompt = (
                f"Question: {question.question}\n\n"
                f"Code:\n{user_code}\n\n"
                f"Output:\n{stdout}\n\n"
                f"Error:\n{stderr if stderr else 'None'}\n\n"
                "Analyze this code and determine if it correctly answers the question. "
                "For code without output, check if it properly implements what was asked. "
                "Respond in JSON with keys: output, hints, suggestions, is_correct. "
                "The 'output' key should contain your analysis if there's no console output."
            )

            chat_response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system", 
                        "content": "You are a Python tutor. Analyze the code thoroughly, "
                                  "even if it doesn't produce output. Check variable declarations, "
                                  "function definitions, and overall structure."
                    },
                    {"role": "user", "content": prompt},
                ],
                temperature=0.7,
            )

            gpt_reply = chat_response.choices[0].message.content

            # 🧩 3. Parse feedback JSON
            try:
                feedback = json.loads(gpt_reply)
            except json.JSONDecodeError:
                if "```json" in gpt_reply:
                    feedback = json.loads(gpt_reply.split("```json")[1].split("```")[0])
                else:
                    raise ValueError("Invalid JSON from OpenAI")

            # ✅ 4. Check for required keys
            for key in ["output", "hints", "suggestions", "is_correct"]:
                if key not in feedback:
                    return Response(
                        {"error": "Incomplete feedback from AI"}, status=500
                    )

            # If there was output from execution, prepend it to the feedback
            if stdout:
                success_msg = translate_to_tamil("Code executed successfully!")
                feedback["output"] = f"{success_msg}\nOutput:\n{stdout}\n\n{feedback['output']}"
            elif not stderr:
                success_msg = translate_to_tamil("Code executed successfully!")
                feedback["output"] = f"{success_msg}\n" + feedback["output"]

            # Translate hints and suggestions to Tamil
            feedback["hints"] = translate_to_tamil(feedback["hints"])
            feedback["suggestions"] = translate_to_tamil(feedback["suggestions"])

            # 📝 5. Save to database
            answer, _ = UserCodeAnswer.objects.update_or_create(
                user=user,
                question=question,
                defaults={
                    "user_code": user_code,
                    "output": feedback["output"],
                    "hints": feedback["hints"],
                    "suggestions": feedback["suggestions"],
                    "is_correct": feedback["is_correct"],
                },
            )

            # 🎯 6. Update progress
            if feedback["is_correct"]:
                progress, _ = UserProgress.objects.get_or_create(user=user)
                progress.score += 10
                progress.save()

            return Response(UserCodeAnswerSerializer(answer).data)

        except CodeQuestion.DoesNotExist:
            return Response({"error": "Question not found"}, status=404)
        except Exception as e:
            logger.error(f"Error in SubmitCodeView: {str(e)}", exc_info=True)
            return Response({"error": "Failed to evaluate code"}, status=500)

            
class MCQQuestionView(generics.ListAPIView):
    serializer_class = MCQQuestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        milestone_id = self.kwargs.get('milestone_id')
        return MCQQuestion.objects.filter(milestone_id=milestone_id).order_by('order')

class SubmitMCQAnswerView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, question_id):
        try:
            question = MCQQuestion.objects.get(id=question_id)
            user = request.user
            selected_option = request.data.get('selected_option', '').upper()
            
            is_correct = selected_option == question.correct_answer
            
            answer, created = UserMCQAnswer.objects.update_or_create(
                user=user,
                question=question,
                defaults={
                    'selected_option': selected_option,
                    'is_correct': is_correct
                }
            )
            
            # Check if all MCQ questions for this milestone are answered correctly
            milestone = question.milestone
            total_questions = MCQQuestion.objects.filter(milestone=milestone).count()
            correct_answers = UserMCQAnswer.objects.filter(
                user=user,
                question__milestone=milestone,
                is_correct=True
            ).count()
            
            # Update progress if all questions are correct
            if correct_answers == total_questions:
                progress = UserProgress.objects.get(user=user)
                if milestone not in progress.completed_milestones.all():
                    progress.score += 15 * total_questions
                    progress.completed_milestones.add(milestone)
                    progress.save()
            
            return Response({
                'is_correct': is_correct,
                'correct_answer': question.correct_answer,
                'explanation': question.explanation
            })
            
        except Exception as e:
            logger.error(f"Error in SubmitMCQAnswerView: {str(e)}")
            return Response(
                {'error': 'Failed to submit MCQ answer'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UserProgressView(generics.RetrieveAPIView):
    serializer_class = UserProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        user = self.request.user
        progress, created = UserProgress.objects.get_or_create(user=user)
        if created or not progress.current_milestone:
            progress.current_milestone = Milestone.objects.first()
            progress.save()
        return progress

class UpdateMilestoneView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        user = request.user
        milestone_id = request.data.get('milestone_id')
        
        try:
            milestone = Milestone.objects.get(id=milestone_id)
            progress = UserProgress.objects.get(user=user)
            progress.current_milestone = milestone
            progress.save()
            
            return Response(
                {'message': 'Milestone updated successfully'},
                status=status.HTTP_200_OK
            )
        except Milestone.DoesNotExist:
            return Response(
                {'error': 'Milestone not found'},
                status=status.HTTP_404_NOT_FOUND
            )

class PersonalizedExerciseView(generics.ListCreateAPIView):
    serializer_class = PersonalizedExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return PersonalizedExercise.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        user = self.request.user
        difficulty = self.request.data.get('difficulty', 'medium')
        
        # Get user's code answer history
        code_answers = UserCodeAnswer.objects.filter(user=user).select_related('question__milestone')
        
        if not code_answers.exists():
            # If no history, create a generic kid-friendly exercise
            exercise = serializer.save(
                user=user,
                question="Write a Python function that calculates the total cost of 3 ice creams where each costs 50 rupees.",
                difficulty='easy',
                hints="Remember to multiply the number of ice creams by the price of each."
            )
            return
        
        # Prepare context for AI with kid-friendly focus
        context = {
            "user_code_examples": [
                {
                    "milestone": answer.question.milestone.title,
                    "question": answer.question.question,
                    "user_code": answer.user_code,
                    "is_correct": answer.is_correct,
                    "attempts": answer.attempts
                }
                for answer in code_answers.order_by('-created_at')[:10]  # Last 10 attempts
            ],
            "weak_areas": self._identify_weak_areas(code_answers),
            "strong_areas": self._identify_strong_areas(code_answers),
            "difficulty": difficulty,
            "country": "Sri Lanka",
            "age_group": "11-16"
        }
        
        # Generate personalized exercise using OpenAI with kid-friendly approach
        prompt = f"""
        You are a Python programming tutor for kids aged 11-16 in Sri Lanka. 
        Create a personalized coding exercise with these requirements:
        
        1. Difficulty: {context['difficulty']}
        2. Focus on: {', '.join(context['weak_areas'])} while reinforcing {', '.join(context['strong_areas'])}
        3. Make it fun and relatable to Sri Lankan kids (use local examples like food, sports, school, etc.)
        4. Should improve logical and critical thinking
        5. Include a clear problem statement and example if needed
        
        Student's recent coding history:
        {json.dumps(context['user_code_examples'], indent=2)}
        
        Respond with JSON containing: question, difficulty, hints (as a list), and example (optional).
        """
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a friendly Python tutor creating fun exercises for kids."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                response_format={ "type": "json_object" }
            )
            
            content = response.choices[0].message.content
            exercise_data = json.loads(content)
            
            # Format hints as text if they come as list
            hints = exercise_data.get('hints', [])
            if isinstance(hints, list):
                hints = "\n".join([f"- {hint}" for hint in hints])
            
            # Save the generated exercise
            exercise = serializer.save(
                user=user,
                question=exercise_data['question'],
                difficulty=exercise_data.get('difficulty', difficulty),
                hints=hints,
                generated_code=exercise_data.get('example', '')
            )
            
        except Exception as e:
            logger.error(f"Error generating personalized exercise: {str(e)}")
            # Fallback to a kid-friendly exercise if AI fails
            serializer.save(
                user=user,
                question="Write a program that calculates how many hoppers (Sri Lankan pancakes) you can make with 500g of flour if each hopper needs 50g of flour.",
                difficulty='easy',
                hints="Divide the total flour by the amount needed for each hopper."
            )

    def _identify_weak_areas(self, code_answers):
        """Identify concepts the user struggles with, simplified for kids"""
        weak_areas = set()
        milestone_weakness = {}
        
        # Count incorrect answers per milestone
        for answer in code_answers:
            if not answer.is_correct:
                milestone = answer.question.milestone.title
                milestone_weakness[milestone] = milestone_weakness.get(milestone, 0) + 1
        
        # Get top 3 weakest milestones
        top_weak = sorted(milestone_weakness.items(), key=lambda x: x[1], reverse=True)[:3]
        
        # Map milestones to simplified concepts
        milestone_map = {
            "Milestone 1": "basic syntax",
            "Milestone 2": "variables",
            "Milestone 3": "data types",
            "Milestone 4": "operators",
            "Milestone 5": "if-else",
            "Milestone 6": "for loops",
            "Milestone 7": "while loops",
            "Milestone 8": "functions",
            "Milestone 9": "arrays",
            "Milestone 10": "math",
            "Milestone 11": "lists",
            "Milestone 12": "tuples",
            "Milestone 13": "sets",
            "Milestone 14": "dictionaries",
            "Milestone 15": "file handling"
        }
        
        for milestone, _ in top_weak:
            weak_areas.add(milestone_map.get(milestone, "basic concepts"))
        
        return weak_areas or {"basic concepts"}

    def _identify_strong_areas(self, code_answers):
        """Identify concepts the user is good at, simplified for kids"""
        strong_areas = set()
        milestone_strength = {}
        
        # Count correct answers on first attempt per milestone
        for answer in code_answers:
            if answer.is_correct and answer.attempts == 1:
                milestone = answer.question.milestone.title
                milestone_strength[milestone] = milestone_strength.get(milestone, 0) + 1
        
        # Get top 3 strongest milestones
        top_strong = sorted(milestone_strength.items(), key=lambda x: x[1], reverse=True)[:3]
        
        # Map milestones to simplified concepts
        milestone_map = {
            "Milestone 1": "basic syntax",
            "Milestone 2": "variables",
            "Milestone 3": "data types",
            "Milestone 4": "operators",
            "Milestone 5": "if-else",
            "Milestone 6": "for loops",
            "Milestone 7": "while loops",
            "Milestone 8": "functions",
            "Milestone 9": "arrays",
            "Milestone 10": "math",
            "Milestone 11": "lists",
            "Milestone 12": "tuples",
            "Milestone 13": "sets",
            "Milestone 14": "dictionaries",
            "Milestone 15": "file handling"
        }
        
        for milestone, _ in top_strong:
            strong_areas.add(milestone_map.get(milestone, "basic concepts"))
        
        return strong_areas or {"basic concepts"}

class SubmitPersonalizedExerciseView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, exercise_id):
        try:
            exercise = PersonalizedExercise.objects.get(id=exercise_id, user=request.user)
            user_code = request.data.get("code", "")
            user_inputs = request.data.get("inputs", [])  # List of inputs for input() calls

            if not user_code:
                return Response({"error": "No code provided"}, status=400)

            # 1. Execute the code using Piston with input support
            piston_payload = {
                "language": "python3",
                "version": "3.10.0",
                "files": [{"name": "main.py", "content": user_code}],
            }
            
            # Add stdin if there are user inputs
            if user_inputs:
                piston_payload["stdin"] = "\n".join(user_inputs) + "\n"

            piston_response = requests.post(
                settings.PISTON_EXECUTE_URL,
                json=piston_payload,
                timeout=10  # Add timeout to prevent hanging
            )

            if piston_response.status_code != 200:
                return Response({"error": "Code execution failed"}, status=500)

            result = piston_response.json().get("run", {})
            stdout = result.get("stdout", "").strip()
            stderr = result.get("stderr", "").strip()

            # Translate error messages to Tamil
            if stderr:
                stderr = translate_to_tamil(stderr)

            # Check if the program is waiting for input
            if "EOFError: EOF when reading a line" in stderr:
                translated_message = translate_to_tamil("This program requires input")
                return Response({
                    "status": "input_required",
                    "message": translated_message,
                    "stdout_so_far": stdout  # Keep stdout in original language
                }, status=200)

            # 2. Call OpenAI with the real output for kid-friendly feedback
            prompt = (
                f"You are a Python tutor for kids aged 11-16 in Sri Lanka. "
                f"Evaluate this code with friendly, encouraging feedback:\n\n"
                f"Exercise: {exercise.question}\n\n"
                f"Student's Code:\n{user_code}\n\n"
                f"Output:\n{stdout}\n\n"
                f"Error:\n{stderr if stderr else 'None'}\n\n"
                "Provide feedback in JSON format with these keys:\n"
                "- output: Formatted output explanation\n"
                "- hints: List of simple hints (max 3)\n"
                "- suggestions: List of improvement suggestions\n"
                "- is_correct: boolean\n"
                "- encouragement: A friendly message praising effort\n"
                "- focus_area: The main concept to work on\n"
                "Keep feedback positive and constructive!"
            )

            chat_response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a friendly Python tutor for kids."},
                    {"role": "user", "content": prompt},
                ],
                temperature=0.7,
                response_format={ "type": "json_object" }
            )

            feedback_content = chat_response.choices[0].message.content

            # 3. Parse feedback JSON
            try:
                feedback = json.loads(feedback_content)
            except json.JSONDecodeError:
                if "```json" in feedback_content:
                    feedback = json.loads(feedback_content.split("```json")[1].split("```")[0])
                else:
                    logger.error(f"Invalid JSON from OpenAI: {feedback_content}")
                    return Response(
                        {"error": "Invalid feedback format from AI"}, 
                        status=500
                    )

            # 4. Check for required keys
            required_keys = ["output", "hints", "suggestions", "is_correct", "encouragement", "focus_area"]
            for key in required_keys:
                if key not in feedback:
                    logger.error(f"Missing key in feedback: {key}")
                    return Response(
                        {"error": f"Incomplete feedback from AI - missing {key}"}, 
                        status=500
                    )

            # 5. Format hints and suggestions
            hints = feedback["hints"]
            if isinstance(hints, list):
                hints = "\n".join([f"• {hint}" for hint in hints])
            
            suggestions = feedback["suggestions"]
            if isinstance(suggestions, list):
                suggestions = "\n".join([f"• {suggestion}" for suggestion in suggestions])

            # Prepend the actual output to the feedback
            if stdout:
                success_msg = translate_to_tamil("Code executed successfully!")
                feedback["output"] = f"{success_msg}\nOutput:\n{stdout}\n\n{feedback['output']}"
            elif not stderr:
                success_msg = translate_to_tamil("Code executed successfully!")
                feedback["output"] = f"{success_msg}\n" + feedback["output"]

            # Translate feedback elements to Tamil
            feedback["hints"] = [translate_to_tamil(hint) if isinstance(feedback["hints"], list) else translate_to_tamil(feedback["hints"])]
            feedback["suggestions"] = [translate_to_tamil(suggestion) if isinstance(feedback["suggestions"], list) else translate_to_tamil(feedback["suggestions"])]
            feedback["encouragement"] = translate_to_tamil(feedback["encouragement"])

            # 6. Update the exercise
            exercise.generated_code = user_code
            exercise.output = feedback["output"]
            exercise.hints = hints
            exercise.suggestions = suggestions
            exercise.is_completed = feedback["is_correct"]
            exercise.attempts += 1
            exercise.save()

            # 7. Update progress if correct
            if feedback["is_correct"]:
                progress = UserProgress.objects.get(user=request.user)
                progress.score += 20  # More points for personalized exercises
                progress.save()

            # 8. Prepare response with encouragement
            response_data = PersonalizedExerciseSerializer(exercise).data
            response_data.update({
                "encouragement": feedback["encouragement"],
                "focus_area": feedback["focus_area"],
                "is_first_attempt": exercise.attempts == 1
            })

            return Response(response_data)

        except PersonalizedExercise.DoesNotExist:
            return Response({"error": "Exercise not found"}, status=404)
        except Exception as e:
            logger.error(f"Error in SubmitPersonalizedExerciseView: {str(e)}", exc_info=True)
            return Response(
                {"error": "Failed to evaluate exercise"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class MarkVideoWatchedView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, milestone_id):
        try:
            milestone = Milestone.objects.get(id=milestone_id)
            user_progress, created = UserProgress.objects.get_or_create(user=request.user)
            user_progress.watched_videos.add(milestone)
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        except Milestone.DoesNotExist:
            return Response({"error": "Milestone not found"}, status=status.HTTP_404_NOT_FOUND)

class MarkCodeCompletedView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, milestone_id):
        try:
            milestone = Milestone.objects.get(id=milestone_id)
            user_progress, created = UserProgress.objects.get_or_create(user=request.user)
            user_progress.completed_code.add(milestone)
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        except Milestone.DoesNotExist:
            return Response({"error": "Milestone not found"}, status=status.HTTP_404_NOT_FOUND)

class MarkExerciseCompletedView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, milestone_id):
        try:
            milestone = Milestone.objects.get(id=milestone_id)
            user_progress, created = UserProgress.objects.get_or_create(user=request.user)
            user_progress.completed_exercises.add(milestone)
            
            if milestone not in user_progress.completed_milestones.all():
                user_progress.completed_milestones.add(milestone)
                user_progress.score += 100
                user_progress.save()
            
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        except Milestone.DoesNotExist:
            return Response({"error": "Milestone not found"}, status=status.HTTP_404_NOT_FOUND)