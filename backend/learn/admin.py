from django.contrib import admin
from .models import Milestone, LearnContent, CodeQuestion, MCQQuestion

@admin.register(Milestone)
class MilestoneAdmin(admin.ModelAdmin):
    list_display = ('order', 'title', 'is_active', 'created_at', 'updated_at')
    list_filter = ('is_active',)
    search_fields = ('title', 'description')
    ordering = ('order',)

@admin.register(LearnContent)
class LearnContentAdmin(admin.ModelAdmin):
    list_display = ('milestone', 'video_url', 'audio_url', 'created_at', 'updated_at')
    list_filter = ('milestone',)
    search_fields = ('transcript', 'milestone__title')

@admin.register(CodeQuestion)
class CodeQuestionAdmin(admin.ModelAdmin):
    list_display = ('milestone', 'short_question', 'created_at', 'updated_at')
    list_filter = ('milestone',)
    search_fields = ('question', 'example_code', 'hint', 'milestone__title')
    ordering = ('milestone__order',)

    def short_question(self, obj):
        return (obj.question[:75] + '...') if len(obj.question) > 75 else obj.question
    short_question.short_description = 'Question'

@admin.register(MCQQuestion)
class MCQQuestionAdmin(admin.ModelAdmin):
    list_display = ('milestone', 'question_text', 'correct_answer', 'created_at', 'updated_at')
    list_filter = ('milestone',)
    search_fields = ('question_text', 'options', 'milestone__title')
    ordering = ('milestone__order',)

    def options_display(self, obj):
        return ', '.join([f"{key}: {value}" for key, value in obj.options.items()])
    options_display.short_description = 'Options'
