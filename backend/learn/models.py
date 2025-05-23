from django.db import models
from user.models import User
import uuid

class Milestone(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField()
    order = models.PositiveIntegerField(unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.order}. {self.title}"

class LearnContent(models.Model):
    milestone = models.ForeignKey(Milestone, on_delete=models.CASCADE, related_name='learn_contents')
    video_url = models.URLField()  # Main video URL (can keep this for backward compatibility)
    audio_url = models.URLField(blank=True, null=True)
    transcript = models.TextField()
    additional_resources = models.JSONField(default=dict, blank=True)
    order = models.PositiveIntegerField(default=0)  # New field for ordering
    is_additional = models.BooleanField(default=False)  # Marks if this is an extra video
    title = models.CharField(max_length=200, blank=True)  # New field for video title
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
        unique_together = ('milestone', 'order')  # Ensure order is unique per milestone

    def __str__(self):
        return f"Learn Content {self.order} for {self.milestone.title}"

class CodeQuestion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    milestone = models.ForeignKey(Milestone, on_delete=models.CASCADE, related_name='code_questions')
    question = models.TextField()
    example_code = models.TextField(blank=True)
    hint = models.TextField(blank=True)
    video_url = models.URLField(blank=True, null=True)  # New field
    video_url_2 = models.URLField(blank=True, null=True)  # New additional video URL
    audio_url = models.URLField(blank=True, null=True)  # New field
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Code Question for {self.milestone.title}"

class UserCodeAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='code_answers')
    question = models.ForeignKey(CodeQuestion, on_delete=models.CASCADE)
    user_code = models.TextField()
    output = models.TextField(blank=True)
    hints = models.TextField(blank=True)
    suggestions = models.TextField(blank=True)
    is_correct = models.BooleanField(default=False)
    attempts = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'question')

    def __str__(self):
        return f"{self.user.email}'s answer to {self.question.id}"

class MCQQuestion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    milestone = models.ForeignKey(Milestone, on_delete=models.CASCADE, related_name='mcq_questions')
    question_text = models.TextField()
    options = models.JSONField()  # Format: {'A': 'Option 1', 'B': 'Option 2', ...}
    correct_answer = models.CharField(max_length=1)  # Stores the correct option key (e.g., 'A', 'B')
    explanation = models.TextField(blank=True)
    audio_url = models.URLField(blank=True, null=True)  # New field
    audio_url_2 = models.URLField(blank=True, null=True)  # New additional audio URL
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']
        unique_together = ('milestone', 'order')

    def __str__(self):
        return f"MCQ Question {self.order} for {self.milestone.title}"

class UserMCQAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mcq_answers')
    question = models.ForeignKey(MCQQuestion, on_delete=models.CASCADE)
    selected_option = models.CharField(max_length=1)
    is_correct = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'question')

    def __str__(self):
        return f"{self.user.email}'s answer to MCQ {self.question.id}"

class UserProgress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    current_milestone = models.ForeignKey(Milestone, on_delete=models.SET_NULL, null=True, related_name='current_users')
    completed_milestones = models.ManyToManyField(Milestone, related_name='completed_by', blank=True)
    watched_videos = models.ManyToManyField(Milestone, related_name='videos_watched_by', blank=True)
    completed_code = models.ManyToManyField(Milestone, related_name='code_completed_by', blank=True)
    completed_exercises = models.ManyToManyField(Milestone, related_name='exercises_completed_by', blank=True)
    score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email}'s Progress"

class PersonalizedExercise(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='personalized_exercises')
    question = models.TextField()
    generated_code = models.TextField(blank=True)
    difficulty = models.CharField(max_length=20, choices=[
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard')
    ], default='easy')
    output = models.TextField(blank=True)
    hints = models.TextField(blank=True)
    suggestions = models.TextField(blank=True)
    is_completed = models.BooleanField(default=False)
    attempts = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Personalized Exercise for {self.user.email}"