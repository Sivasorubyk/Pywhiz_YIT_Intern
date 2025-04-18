from rest_framework import serializers
from .models import (
    Milestone, LearnContent, CodeQuestion,
    UserCodeAnswer, MCQQuestion, UserMCQAnswer,
    UserProgress, PersonalizedExercise
)
from user.serializers import UserSerializer

class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = '__all__'

class LearnContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearnContent
        fields = '__all__'

class CodeQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeQuestion
        fields = '__all__'

class UserCodeAnswerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    question = CodeQuestionSerializer(read_only=True)
    
    class Meta:
        model = UserCodeAnswer
        fields = '__all__'
        read_only_fields = ('user', 'output', 'hints', 'suggestions', 'is_correct')

class MCQQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MCQQuestion
        fields = '__all__'

class UserMCQAnswerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    question = MCQQuestionSerializer(read_only=True)
    
    class Meta:
        model = UserMCQAnswer
        fields = '__all__'
        read_only_fields = ('user', 'is_correct')

class UserProgressSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    current_milestone = MilestoneSerializer(read_only=True)
    completed_milestones = MilestoneSerializer(many=True, read_only=True)
    
    class Meta:
        model = UserProgress
        fields = '__all__'
        read_only_fields = ('user', 'score', 'completed_milestones')

class PersonalizedExerciseSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = PersonalizedExercise
        fields = '__all__'
        read_only_fields = ('user', 'output', 'hints', 'suggestions', 'is_completed')