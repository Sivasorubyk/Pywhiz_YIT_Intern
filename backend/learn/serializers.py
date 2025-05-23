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
        fields = '__all__'  # This will automatically include video_url_2

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
        fields = '__all__'  # This will automatically include audio_url_2

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
    watched_videos = serializers.SerializerMethodField()
    completed_code = serializers.SerializerMethodField()
    completed_exercises = serializers.SerializerMethodField()
    
    class Meta:
        model = UserProgress
        fields = [
            'user', 'current_milestone', 'completed_milestones',
            'watched_videos', 'completed_code', 'completed_exercises',
            'score', 'created_at', 'updated_at'
        ]
        read_only_fields = ('user', 'score', 'completed_milestones',
                           'watched_videos', 'completed_code', 'completed_exercises')
    
    def get_watched_videos(self, obj):
        return [milestone.id for milestone in obj.watched_videos.all()]
    
    def get_completed_code(self, obj):
        return [milestone.id for milestone in obj.completed_code.all()]
    
    def get_completed_exercises(self, obj):
        return [milestone.id for milestone in obj.completed_exercises.all()]

class PersonalizedExerciseSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    based_on = UserCodeAnswerSerializer(read_only=True)
    
    class Meta:
        model = PersonalizedExercise
        fields = '__all__'
        read_only_fields = (
            'user',
            'question',         
            'output',
            'hints',
            'suggestions',
            'is_completed',
            'focus_areas',
            'based_on',
            'created_at',
            'updated_at'
        )