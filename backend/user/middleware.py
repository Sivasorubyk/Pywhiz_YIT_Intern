# user/middleware.py
from django.utils.deprecation import MiddlewareMixin
import jwt
from django.conf import settings
from datetime import datetime, timedelta
import requests

class TokenRefreshMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Skip if no access token
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            return None
            
        try:
            # Decode the token
            payload = jwt.decode(
                access_token, 
                settings.SECRET_KEY, 
                algorithms=['HS256']
            )
            
            # Check if token is about to expire (e.g., less than 5 minutes left)
            exp_timestamp = payload.get('exp')
            if exp_timestamp:
                exp_datetime = datetime.fromtimestamp(exp_timestamp)
                now = datetime.now()
                
                # If token expires in less than 5 minutes, refresh it
                if exp_datetime - now < timedelta(minutes=5):
                    # Make a request to the refresh endpoint
                    response = requests.post(
                        f"{request.scheme}://{request.get_host()}/api/auth/token/refresh/",
                        cookies={'refresh_token': request.COOKIES.get('refresh_token')}
                    )
                    
                    if response.status_code == 200 and 'access_token' in response.cookies:
                        # Update the access token cookie
                        request.COOKIES['access_token'] = response.cookies.get('access_token')
                        
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
            # Token is already expired or invalid, let the view handle it
            pass
            
        return None