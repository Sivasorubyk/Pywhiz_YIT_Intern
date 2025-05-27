from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
from datetime import datetime, timedelta
import jwt
from rest_framework_simplejwt.exceptions import InvalidToken

class TokenRefreshMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Skip middleware for token refresh endpoint
        if request.path == '/api/token/refresh/':
            return None
            
        access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        
        if not access_token:
            return None
            
        try:
            payload = jwt.decode(
                access_token,
                settings.SECRET_KEY,
                algorithms=['HS256'],
                options={'verify_signature': False}
            )
            
            exp_timestamp = payload.get('exp')
            if exp_timestamp:
                exp_datetime = datetime.fromtimestamp(exp_timestamp)
                now = datetime.now()
                
                # If token expires in less than 15 minutes, set flag
                if exp_datetime - now < timedelta(minutes=15):
                    request.should_refresh_token = True
                    
        except jwt.ExpiredSignatureError:
            request.should_refresh_token = True
        except jwt.InvalidTokenError:
            pass
            
        return None