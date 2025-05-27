from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken
from datetime import datetime, timedelta

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Skip for certain endpoints
        if request.path in ['/api/token/refresh/', '/api/login/']:
            return None
            
        raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        raw_refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        
        if not raw_token and not raw_refresh_token:
            return None
        
        try:
            if raw_token:
                validated_token = self.get_validated_token(raw_token)
                user = self.get_user(validated_token)
                return (user, validated_token)
                
            return None
            
        except InvalidToken as e:
            if raw_refresh_token:
                try:
                    AccessToken(raw_token, verify=False)
                    # Token is expired but refresh available
                    return None
                except Exception:
                    raise AuthenticationFailed('Your session is invalid. Please log in again.')
            raise AuthenticationFailed('Please log in to continue.')