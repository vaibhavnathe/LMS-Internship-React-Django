# Generated by Django 5.0.7 on 2024-10-12 07:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0030_attemptquiz_right_ans'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='attemptquiz',
            name='question',
        ),
        migrations.AddField(
            model_name='attemptquiz',
            name='quiz',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.quiz'),
        ),
    ]