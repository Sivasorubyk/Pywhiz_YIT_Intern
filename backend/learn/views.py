from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
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
import openai
import json
import logging

logger = logging.getLogger(__name__)

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
            user_code = request.data.get('code', '')
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Evaluate this Python code."},
                    {"role": "user", "content": f"Code: {user_code}\nQuestion: {question.question}"}
                ],
                temperature=0.7
            )
            
            feedback = json.loads(response.choices[0].message.content)
            
            answer, created = UserCodeAnswer.objects.update_or_create(
                user=user,
                question=question,
                defaults={
                    'user_code': user_code,
                    'output': feedback.get('output', ''),
                    'hints': feedback.get('hints', ''),
                    'suggestions': feedback.get('suggestions', ''),
                    'is_correct': feedback.get('is_correct', False)
                }
            )
            
            if answer.is_correct:
                progress = UserProgress.objects.get(user=user)
                progress.score += 10
                progress.save()
            
            return Response(UserCodeAnswerSerializer(answer).data)
            
        except Exception as e:
            logger.error(f"Error in SubmitCodeView: {str(e)}")
            return Response(
                {'error': 'Failed to evaluate code'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

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
        serializer.save(user=self.request.user)

class SubmitPersonalizedExerciseView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, exercise_id):
        try:
            exercise = PersonalizedExercise.objects.get(id=exercise_id, user=request.user)
            user_code = request.data.get('code', '')
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Evaluate this Python code."},
                    {"role": "user", "content": f"Exercise: {exercise.question}\nCode: {user_code}"}
                ],
                temperature=0.7
            )
            
            feedback = json.loads(response.choices[0].message.content)
            
            exercise.generated_code = user_code
            exercise.output = feedback.get('output', '')
            exercise.hints = feedback.get('hints', '')
            exercise.suggestions = feedback.get('suggestions', '')
            exercise.is_completed = feedback.get('is_correct', False)
            exercise.attempts += 1
            exercise.save()
            
            if exercise.is_completed:
                progress = UserProgress.objects.get(user=request.user)
                progress.score += 20
                progress.save()
            
            return Response(PersonalizedExerciseSerializer(exercise).data)
            
        except Exception as e:
            logger.error(f"Error in SubmitPersonalizedExerciseView: {str(e)}")
            return Response(
                {'error': 'Failed to evaluate exercise'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )