from django.http import JsonResponse
import jwt
from datetime import datetime
from django.conf import settings

def check_token_refresh(view_func):
    """
    Decorator to automatically refresh token if needed
    """
    def wrapper(request, *args, **kwargs):
        response = view_func(request, *args, **kwargs)
        
        if hasattr(request, 'should_refresh_token') and request.should_refresh_token:
            refresh_token = request.COOKIES.get('refresh_token')
            if refresh_token:
                try:
                    # Verify refresh token is valid
                    jwt.decode(
                        refresh_token,
                        settings.SECRET_KEY,
                        algorithms=['HS256']
                    )
                    
                    # If we get here, token is valid
                    response.data['should_refresh_token'] = True
                except jwt.ExpiredSignatureError:
                    response.data['session_expired'] = True
                except jwt.InvalidTokenError:
                    pass
                    
        return response
    return wrapper