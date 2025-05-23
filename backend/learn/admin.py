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
    list_display = ('milestone', 'order', 'title', 'video_url', 'is_additional', 'created_at')
    list_editable = ('order', 'is_additional')  # Allow quick editing of order
    search_fields = ('title', 'transcript', 'milestone__title')
    list_filter = ('milestone', 'is_additional', 'created_at')
    ordering = ('milestone__order', 'order')

@admin.register(CodeQuestion)
class CodeQuestionAdmin(admin.ModelAdmin):
    list_display = ("milestone", "question", "video_url", "video_url_2", "audio_url", "created_at")
    search_fields = ("question", "milestone__title")
    list_filter = ("milestone",)

@admin.register(MCQQuestion)
class MCQQuestionAdmin(admin.ModelAdmin):
    list_display = ('milestone', 'order', 'question_text', 'correct_answer', 'audio_url', 'created_at')
    list_filter = ('milestone',)
    search_fields = ('question_text',)
    ordering = ('milestone__order', 'order')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('milestone', 'order', 'question_text', 'options', 'correct_answer', 'explanation', 'audio_url')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )