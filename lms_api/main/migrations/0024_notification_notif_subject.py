# Generated by Django 5.0.7 on 2024-10-05 08:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0023_rename_student_notification_student'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='notif_subject',
            field=models.CharField(max_length=200, null=True, verbose_name='Notification Subject'),
        ),
    ]
