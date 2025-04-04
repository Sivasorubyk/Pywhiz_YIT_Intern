from rest_framework import generics, permissions
from .models import CodeSubmission, Exercise, ExerciseSubmission
from .serializers import CodeSubmissionSerializer, ExerciseSerializer, ExerciseSubmissionSerializer
from user.models import User
import openai
import os

class CodeSubmissionCreateView(generics.CreateAPIView):
    serializer_class = CodeSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CodeSubmissionListView(generics.ListAPIView):
    serializer_class = CodeSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return CodeSubmission.objects.filter(user=self.request.user).order_by('-created_at')

class ExerciseCreateView(generics.CreateAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        # Remove any incoming question/difficulty from request data
        request.data.pop('question', None)
        request.data.pop('difficulty', None)
        return super().create(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        user = self.request.user
        client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        
        # Generate question
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Generate a Python exercise question. Return ONLY the question text."},
                {"role": "user", "content": f"Difficulty: {self._determine_level(user)}"}
            ],
            temperature=0.7
        )
        
        serializer.save(
            user=user,
            question=response.choices[0].message.content.strip(),
            difficulty=self._determine_level(user)
        )
    
    def _determine_level(self, user):
        """Determine difficulty based on user's past submissions"""
        submissions = CodeSubmission.objects.filter(user=user).count()
        if submissions > 10: return "hard"
        if submissions > 3: return "medium"
        return "easy"
        
class ExerciseListView(generics.ListAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Exercise.objects.filter(user=self.request.user).order_by('-created_at')

class ExerciseSubmissionCreateView(generics.CreateAPIView):
    serializer_class = ExerciseSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)