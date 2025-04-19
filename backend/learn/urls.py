from django.urls import path
from .views import (
    MilestoneListView, LearnContentView, CodeQuestionView,
    SubmitCodeView, MCQQuestionView, SubmitMCQAnswerView,
    UserProgressView, UpdateMilestoneView,
    PersonalizedExerciseView, SubmitPersonalizedExerciseView,
    MarkVideoWatchedView, MarkCodeCompletedView, MarkExerciseCompletedView
)

urlpatterns = [
    # Existing paths
    path('milestones/', MilestoneListView.as_view(), name='milestone-list'),
    path('milestones/<uuid:milestone_id>/learn/', LearnContentView.as_view(), name='learn-content'),
    path('milestones/<uuid:milestone_id>/questions/', CodeQuestionView.as_view(), name='code-questions'),
    path('questions/<uuid:question_id>/submit/', SubmitCodeView.as_view(), name='submit-code'),
    path('milestones/<uuid:milestone_id>/mcq-questions/', MCQQuestionView.as_view(), name='mcq-questions'),
    path('mcq-questions/<uuid:question_id>/submit/', SubmitMCQAnswerView.as_view(), name='submit-mcq-answer'),
    path('progress/', UserProgressView.as_view(), name='user-progress'),
    path('progress/update-milestone/', UpdateMilestoneView.as_view(), name='update-milestone'),
    path('personalized-exercises/', PersonalizedExerciseView.as_view(), name='personalized-exercise-list'),
    path('personalized-exercises/<uuid:exercise_id>/submit/', SubmitPersonalizedExerciseView.as_view(), name='submit-personalized-exercise'),
    
    # New progress tracking endpoints
    path('milestones/<uuid:milestone_id>/mark-video-watched/', MarkVideoWatchedView.as_view(), name='mark-video-watched'),
    path('milestones/<uuid:milestone_id>/mark-code-completed/', MarkCodeCompletedView.as_view(), name='mark-code-completed'),
    path('milestones/<uuid:milestone_id>/mark-exercise-completed/', MarkExerciseCompletedView.as_view(), name='mark-exercise-completed'),
]