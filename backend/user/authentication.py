from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Get the token from the cookie instead of the Authorization header
        raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        
        if raw_token is None:
            return None
        
        # Add the token to the Authorization header format that JWTAuthentication expects
        validated_token = self.get_validated_token(raw_token)
        
        return self.get_user(validated_token), validated_token