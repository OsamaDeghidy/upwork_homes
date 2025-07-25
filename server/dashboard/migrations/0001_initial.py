# Generated by Django 4.2.7 on 2025-07-20 04:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='QuickAction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('icon', models.CharField(max_length=50)),
                ('link', models.CharField(max_length=200)),
                ('color', models.CharField(default='primary', max_length=20)),
                ('order', models.IntegerField(default=0)),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quick_actions', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['order', 'created_at'],
            },
        ),
        migrations.CreateModel(
            name='PerformanceMetrics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completion_rate', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('average_rating', models.DecimalField(decimal_places=2, default=0, max_digits=3)),
                ('response_time', models.IntegerField(default=0)),
                ('client_satisfaction', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('repeat_clients', models.IntegerField(default=0)),
                ('total_projects', models.IntegerField(default=0)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='performance_metrics', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Performance Metrics',
            },
        ),
        migrations.CreateModel(
            name='PendingAction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pending_proposals', models.IntegerField(default=0)),
                ('pending_contracts', models.IntegerField(default=0)),
                ('pending_payments', models.IntegerField(default=0)),
                ('pending_reviews', models.IntegerField(default=0)),
                ('urgent_jobs', models.IntegerField(default=0)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='pending_actions', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Pending Actions',
            },
        ),
        migrations.CreateModel(
            name='DashboardStats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active_jobs', models.IntegerField(default=0)),
                ('total_earned', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('proposals_sent', models.IntegerField(default=0)),
                ('success_rate', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('completed_jobs', models.IntegerField(default=0)),
                ('pending_payments', models.IntegerField(default=0)),
                ('average_rating', models.DecimalField(decimal_places=2, default=0, max_digits=3)),
                ('total_clients', models.IntegerField(default=0)),
                ('monthly_earnings', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('weekly_earnings', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('jobs_this_month', models.IntegerField(default=0)),
                ('proposals_this_month', models.IntegerField(default=0)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='dashboard_stats', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Dashboard Statistics',
            },
        ),
        migrations.CreateModel(
            name='DashboardNotification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('message', models.TextField()),
                ('notification_type', models.CharField(choices=[('info', 'Information'), ('success', 'Success'), ('warning', 'Warning'), ('error', 'Error')], default='info', max_length=10)),
                ('read', models.BooleanField(default=False)),
                ('link', models.URLField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='dashboard_notifications', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='DashboardAnalytics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('earnings_chart_data', models.JSONField(default=dict)),
                ('jobs_chart_data', models.JSONField(default=dict)),
                ('proposals_chart_data', models.JSONField(default=dict)),
                ('ratings_chart_data', models.JSONField(default=dict)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='dashboard_analytics', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Dashboard Analytics',
            },
        ),
    ]
