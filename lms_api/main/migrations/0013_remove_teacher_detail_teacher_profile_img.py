# Generated by Django 5.0.7 on 2024-09-26 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_alter_courserating_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='detail',
        ),
        migrations.AddField(
            model_name='teacher',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='teacher_profile_imgs/'),
        ),
    ]