# Generated by Django 5.0.7 on 2024-10-10 06:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0026_quizquestions_delete_quizquetions'),
    ]

    operations = [
        migrations.RenameField(
            model_name='coursequiz',
            old_name='Quiz',
            new_name='quiz',
        ),
    ]
