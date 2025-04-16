from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken
from datetime import datetime, timedelta

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Get tokens from cookies
        raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        raw_refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        
        if not raw_token and not raw_refresh_token:
            return None
        
        try:
            if raw_token:
                # Validate access token
                validated_token = self.get_validated_token(raw_token)
                user = self.get_user(validated_token)
                return (user, validated_token)
            
            # If no access token but refresh token exists, let the view handle refresh
            return None
            
        except InvalidToken as e:
            # If access token is invalid, check if we should attempt refresh
            if raw_refresh_token:
                # Check if token is expired (not just malformed)
                try:
                    AccessToken(raw_token, verify=False)  # Just to check expiration
                    # If we get here, token is expired but otherwise valid
                    return None  # Let the view handle refresh
                except Exception:
                    # Token is malformed, not just expired
                    raise AuthenticationFailed('Invalid token')
            raise AuthenticationFailed('Invalid token')