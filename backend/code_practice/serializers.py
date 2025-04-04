from rest_framework import serializers
from .models import CodeSubmission, Exercise, ExerciseSubmission
import openai
import os
from django.conf import settings

class CodeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeSubmission
        fields = ['id', 'code', 'output', 'hints', 'suggestions', 'created_at']
        read_only_fields = ['output', 'hints', 'suggestions', 'created_at']
    
    def create(self, validated_data):
        user = self.context['request'].user
        code = validated_data['code']
        
        try:
            client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
            
            # Get code output (new API syntax)
            output_response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Execute this Python code and return ONLY the raw output. No explanations."},
                    {"role": "user", "content": code}
                ],
                max_tokens=1000,
                temperature=0
            )
            output = output_response.choices[0].message.content.strip()
            
            # Get analysis (new API syntax)
            analysis_response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Analyze this Python code. Provide:\n1. Hints (Markdown bullet points)\n2. Suggestions (Markdown bullet points)"},
                    {"role": "user", "content": code}
                ],
                max_tokens=1000,
                temperature=0.3
            )
            analysis = analysis_response.choices[0].message.content
            
            submission = CodeSubmission.objects.create(
                user=user,
                code=code,
                output=output,
                hints=self._extract_section(analysis, "Hints"),
                suggestions=self._extract_section(analysis, "Suggestions")
            )
            return submission
        
        except Exception as e:
            raise serializers.ValidationError(f"OpenAI Error: {str(e)}")
    
    def _extract_section(self, text, section_name):
        """Helper to extract hints/suggestions from analysis"""
        start = text.find(f"{section_name}:")
        if start == -1:
            return ""
        end = text.find("\n\n", start)
        return text[start:end].strip()

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'question', 'difficulty', 'created_at']
        read_only_fields = ['question', 'difficulty']  
class ExerciseSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseSubmission
        fields = ['id', 'exercise', 'answer', 'feedback', 'is_correct', 'submitted_at']