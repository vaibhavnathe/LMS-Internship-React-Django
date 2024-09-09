from django.db import models
from django.core import serializers
# Create your models here.

# Teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    detail = models.TextField(null=True)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20)
    skills = models.TextField()

    class Meta:
        verbose_name_plural="1. Teacher"

    def skill_list(self):
        skill_list = self.skills.split(',')
        skill_list = [skill.strip() for skill in skill_list]
        return skill_list


# CourseCategory Model
class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()

    class Meta:
        verbose_name_plural="2. Course Categories"

    def __str__(self):
        return self.title


# Course Model
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='teacher_courses')
    title = models.CharField(max_length=150)
    description = models.TextField() 
    featured_img = models.ImageField(upload_to='course_imgs/' , null=True)
    techs = models.TextField(null=True)

    class Meta:
        verbose_name_plural="3. Courses"

    def related_videos(self):
        related_videos = Course.objects.filter(techs__icontains=self.techs)
        return serializers.serialize('json', related_videos)

    def tech_list(self):
        tech_list = self.techs.split(',')
        tech_list = [tech.strip() for tech in tech_list]
        return tech_list

    def total_enrolled_students(self):
        total_enrolled_students = StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_students

    def course_rating(self):
        course_rating = CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']

    def __str__(self):
        return self.title



# Chapter Model
class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_chapters')
    title = models.CharField(max_length=150)
    description = models.TextField() 
    video = models.FileField(upload_to='chapter_videos/' , null=True)
    remarks = models.TextField(null=True)

    class Meta:
        verbose_name_plural="4. Chapters"



class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    username = models.CharField(max_length=200)
    interested_categories = models.TextField()

    def __str__(self):
        return self.full_name

    class Meta:
        verbose_name_plural="5. Student"


# Student Course Enrollement
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrolled_courses')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrolled_student')
    enrolled_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural="6. Enrolled Courses"

    def __str__(self):
        return f"{self.course}-{self.student}"


# Course Rating and Review
class CourseRating(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    rating = models.PositiveBigIntegerField(default=0)
    reviews = models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.course}-{self.student}-{self.rating}"
