# Generated by Django 5.2.4 on 2025-07-17 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='additional_requirements',
            field=models.TextField(blank=True, help_text='Additional requirements and special instructions'),
        ),
    ]
