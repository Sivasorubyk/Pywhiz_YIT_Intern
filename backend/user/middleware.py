from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
from datetime import datetime, timedelta
import jwt
from rest_framework_simplejwt.exceptions import InvalidToken

class TokenRefreshMiddleware(MiddlewareMixin):
    """
    Middleware to check for near-expiring access tokens
    and set a flag if they need refreshing.
    """
    def process_request(self, request):
        access_token = request.COOKIES.get('access_token')
        
        if not access_token:
            return None
            
        try:
            # Decode without verification to check expiration only
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
                
                # If token expires in less than 5 minutes, set flag
                if exp_datetime - now < timedelta(minutes=5):
                    request.should_refresh_token = True
                    
        except (jwt.ExpiredSignatureError, InvalidToken):
            request.should_refresh_token = True
        except jwt.InvalidTokenError:
            pass
            
        return None