from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

def bad_request(request, exception):
    """
    400 Bad Request Error Handler
    """
    logger.warning(f"Bad request: {request.path} - {exception}")
    return JsonResponse({
        'error': 'Bad Request',
        'message': 'The request could not be understood by the server.',
        'status_code': 400
    }, status=status.HTTP_400_BAD_REQUEST)

def permission_denied(request, exception):
    """
    403 Permission Denied Error Handler
    """
    logger.warning(f"Permission denied: {request.path} - {exception}")
    return JsonResponse({
        'error': 'Permission Denied',
        'message': 'You do not have permission to access this resource.',
        'status_code': 403
    }, status=status.HTTP_403_FORBIDDEN)

def page_not_found(request, exception):
    """
    404 Page Not Found Error Handler
    """
    logger.warning(f"Page not found: {request.path}")
    return JsonResponse({
        'error': 'Not Found',
        'message': 'The requested resource could not be found.',
        'status_code': 404
    }, status=status.HTTP_404_NOT_FOUND)

def server_error(request):
    """
    500 Internal Server Error Handler
    """
    logger.error(f"Server error: {request.path}")
    return JsonResponse({
        'error': 'Internal Server Error',
        'message': 'An unexpected error occurred. Please try again later.',
        'status_code': 500
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 