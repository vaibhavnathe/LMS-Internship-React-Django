from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher
        fields=['id','full_name', 'email', 'password', 'qualification', 'mobile_no','skills', 'teacher_courses', 'skill_list', 'profile_img']

    def __init__(self, *args, **kwargs):
            super(TeacherSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 1

class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher
        fields=['total_teacher_courses','total_teacher_students','total_teacher_chapters']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Student
        fields=['id','full_name', 'email', 'username', 'password', 'interested_categories', 'profile_img']
        # depth=1

class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Student
        fields=['enrolled_courses','favourite_courses','complete_assignments', 'pending_assignments']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CourseCategory
        fields =['id', 'title', 'description']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Course
        fields=['id', 'category', 'teacher', 'title', 'description', 'featured_img', 'techs', 'course_chapters', 'related_videos', 'tech_list', 'total_enrolled_students', 'course_rating']
    def __init__(self, *args, **kwargs):
            super(CourseSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 1
    

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Chapter
        fields=['id', 'course', 'title', 'description', 'video', 'remarks']
    def __init__(self, *args, **kwargs):
            super(ChapterSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 1

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentCourseEnrollment
        fields =['id', 'course', 'student', 'enrolled_time']
    def __init__(self, *args, **kwargs):
            super(StudentCourseEnrollSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 2

class StudentFavouriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentFavouriteCourse
        fields =['id', 'course', 'student', 'status']

    def __init__(self, *args, **kwargs):
            super(StudentFavouriteCourseSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 2

class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CourseRating
        fields =['id', 'course', 'student', 'rating', 'reviews', 'review_time']
        
    def __init__(self, *args, **kwargs):
            super(CourseRatingSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 1


# Student Assignment Serializer
class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentAssignment
        fields=['id','teacher','student', 'title', 'detail', 'student_status', 'add_time']
    def __init__(self, *args, **kwargs):
            super(StudentAssignmentSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 2

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Notification
        fields=['teacher','student','notif_for', 'notif_subject', 'notif_created_time', 'notifiread_status']


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Quiz
        fields=['id','teacher', 'title', 'detail', 'assign_status','add_time']
    def __init__(self, *args, **kwargs):
            super(QuizSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 2


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.QuizQuestions
        fields=['id', 'quiz', 'question', 'ans1', 'ans2', 'ans3','ans4', 'right_ans']
    def __init__(self, *args, **kwargs):
            super(QuestionSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 1

class CourseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CourseQuiz
        fields =['id','teacher', 'course', 'quiz', 'add_time']
    def __init__(self, *args, **kwargs):
            super(CourseQuizSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 2