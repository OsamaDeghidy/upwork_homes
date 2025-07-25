import os
from celery import Celery
from django.conf import settings

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alist_backend.settings')

app = Celery('alist_backend')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()

# Celery beat schedule
app.conf.beat_schedule = {
    'send-notification-emails': {
        'task': 'notifications.tasks.send_notification_emails',
        'schedule': 300.0,  # Run every 5 minutes
    },
    'update-project-stats': {
        'task': 'projects.tasks.update_project_statistics',
        'schedule': 3600.0,  # Run every hour
    },
    'cleanup-old-sessions': {
        'task': 'authentication.tasks.cleanup_old_sessions',
        'schedule': 86400.0,  # Run daily
    },
}

app.conf.timezone = 'UTC'

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}') 