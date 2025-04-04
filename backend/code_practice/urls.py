from django.urls import path
from .views import (
    CodeSubmissionCreateView, 
    CodeSubmissionListView,  # Now properly imported
    ExerciseCreateView,
    ExerciseListView,
    ExerciseSubmissionCreateView
)

urlpatterns = [
    path('code-submissions/', CodeSubmissionCreateView.as_view()),
    path('code-submissions/list/', CodeSubmissionListView.as_view()),
    path('exercises/', ExerciseCreateView.as_view()),
    path('exercises/list/', ExerciseListView.as_view()),
    path('exercise-submissions/', ExerciseSubmissionCreateView.as_view()),
]