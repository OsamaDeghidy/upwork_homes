# Generated by Django 4.2.7 on 2025-07-26 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_alter_user_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='emergency_contact_phone',
            field=models.CharField(blank=True, help_text='Emergency contact phone', max_length=20, null=True),
        ),
    ]
