from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import  ListAPIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer, StudentSerializer,StudentCourseEnrollSerializer, CourseRatingSerializer, TeacherDashboardSerializer,StudentFavouriteCourseSerializer,StudentAssignmentSerializer, StudentDashboardSerializer, NotificationSerializer,QuizSerializer, QuestionSerializer,CourseQuizSerializer, AttemptQuizSerializer
from django.http import JsonResponse
from . import models
from django.db.models import Q

# views(controllers)

# fetch all the list of teachers
class TeacherList (generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]

# 
class TeacherDetail (generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]

class TeacherDashboard(generics.RetrieveAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class=TeacherDashboardSerializer
    
# teacher login - getting data from request and validate it and return response
@csrf_exempt
def teacher_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')

    try:
         teacherData = models.Teacher.objects.get(email=email, password=password)
    except models.Teacher.DoesNotExist:
        teacherData=None
   
    if(teacherData):
        return JsonResponse({'bool':True, 'teacher_id':teacherData.id})
    else:
        return JsonResponse({'bool':False})

# fetch all categories
class CategoryList (generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAuthenticated]

# fetch All Courses
class CourseList (generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit=int(self.request.GET['result'])
            qs = models.Course.objects.all().order_by('-id')[:limit]

        if 'category' in self.request.GET:
            category=self.request.GET['category']
            qs=models.Course.objects.filter(techs__icontains=category)

        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name=self.request.GET['skill_name']
            teacher=self.request.GET['teacher']
            teacher = models.Teacher.objects.filter(id=teacher).first()
            qs=models.Course.objects.filter(techs__icontains=skill_name, teacher=teacher) 

        elif 'studentId' in self.kwargs:
            student_id = self.kwargs['studentId']
            student = models.Student.objects.get(pk=student_id)
            queries = [Q(techs__iendswith=value) for value in student.interested_categories]
            query = queries.pop()
            for item in queries:
                query |= item
            qs=models.Course.objects.filter(query)

        if 'searchString' in self.kwargs:
            search=self.kwargs['searchString']
            if search:
                qs=models.Course.objects.filter( Q(title__icontains=search) | Q(techs__icontains=search)) 
            else:
                qs=models.Course.objects.all() 

        return qs


# fetch the specific Teacher Course
class TeacherCourseList (generics.ListAPIView):
    serializer_class = CourseSerializer
    
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher = teacher)


# fetch the specific Teacher Course
class TeacherCourseDetail ( generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer 
    

# Chapter Lists
class ChapterList (generics.ListCreateAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer


# Specific Course Chapter List
class CourseChapterList (generics.ListAPIView):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        # course = models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course = course_id)


# Chapter Lists
class ChapterDetailView (generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer



# Specific Course detail View
class CourseDetailView (generics.RetrieveAPIView):
    serializer_class = CourseSerializer
    queryset = models.Course.objects.all()



# Teacher Change Password
@csrf_exempt
def teacher_change_password(request, teacher_id):
    if request.method == 'POST':
        password = request.POST.get('password', None)

        if not password:
            return JsonResponse({'bool': False, 'error': 'Password not provided'})

        try:
            teacherData = models.Teacher.objects.get(id=teacher_id)
        except models.Teacher.DoesNotExist:
            return JsonResponse({'bool': False, 'error': 'Teacher not found'})

        # Update password (consider using a hashed password)
        teacherData.password = password
        teacherData.save()
        return JsonResponse({'bool': True})

    return JsonResponse({'bool': False, 'error': 'Invalid request method'})


# ******* Student Data ********* 

# fetch all the list of Stdent
class StudentList (generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes = [permissions.IsAuthenticated]

class StudentDashboard(generics.RetrieveAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentDashboardSerializer
    

@csrf_exempt
def student_login(request):
    email = request.POST.get('email')
    password = request.POST.get('password')

    try:
         studentData = models.Student.objects.get(email=email, password=password)
    except models.Student.DoesNotExist:
        studentData=None
   
    if(studentData):
        return JsonResponse({'bool':True, 'student_id':studentData.id})
    else:
        return JsonResponse({'bool':False})


# Student Change Password
@csrf_exempt
def student_change_password(request, student_id):
    if request.method == 'POST':
        password = request.POST.get('password', None)

        if not password:
            return JsonResponse({'bool': False, 'error': 'Password not provided'})

        try:
            studentData = models.Student.objects.get(id=student_id)
        except models.Student.DoesNotExist:
            return JsonResponse({'bool': False, 'error': 'Student not found'})

        # Update password (consider using a hashed password)
        studentData.password = password
        studentData.save()
        return JsonResponse({'bool': True})

    return JsonResponse({'bool': False, 'error': 'Invalid request method'})




# StudentCourseEnrollment View
class StudentCourseEnrollmentList (generics.ListCreateAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer


def fetch_enroll_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()

    enrollStatus = models.StudentCourseEnrollment.objects.filter(course=course, student=student).count()

    if(enrollStatus):
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

class EnrolledStudentList (generics.ListAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.StudentCourseEnrollment.objects.filter(course = course)

        elif 'teacher_id' in self.kwargs:
            teacher_id = self.kwargs['teacher_id']
            teacher = models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct()

        elif 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrollment.objects.filter(student=student).distinct()


       

# Course Rating Ciew
class CourseRatingList (generics.ListCreateAPIView):
    queryset = models.CourseRating.objects.all()
    serializer_class = CourseRatingSerializer

# Fetch rating Status
def fetch_rating_status(request, student_id, course_id):
    student = models.Student.objects.filter(id=student_id).first()
    course = models.Course.objects.filter(id=course_id).first()

    ratingStatus = models.CourseRating.objects.filter(course=course, student=student).count()

    if(ratingStatus):
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})


# Student Favourite Courses views

class StudentFavouriteCourseList(generics.ListCreateAPIView):
    queryset=models.StudentFavouriteCourse.objects.all()
    serializer_class=StudentFavouriteCourseSerializer

    def get_queryset(self):

        if 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = models.Student.objects.get(pk=student_id)
            return models.StudentFavouriteCourse.objects.filter(student=student).distinct()

def fetch_enroll_status(request, student_id, course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    enrollStatus=models.StudentCourseEnrollment.objects.filter(course=course, student=student).count()
    if enrollStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

def fetch_favourite_status(request, student_id, course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    favouriteStatus=models.StudentFavouriteCourse.objects.filter(course=course, student=student).first()
    if favouriteStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

def remove_favourite_course(request, course_id, student_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    favouriteStatus=models.StudentFavouriteCourse.objects.filter(course=course, student=student).delete()
    if favouriteStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})


# View for Student Assignments
# fetch all categories
class AssignmentList (generics.ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        student_id = self.kwargs['student_id']
        teacher_id = self.kwargs['teacher_id']
        student = models.Student.objects.get(pk=student_id)
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.StudentAssignment.objects.filter(student=student,teacher = teacher)

     

# Fetching the Student Assignments
class MyAssignmentList (generics.ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        student_id = self.kwargs['student_id']
        student = models.Student.objects.get(pk=student_id)
        # Update Notifivations
        models.Notification.objects.filter(student=student, notif_for='student', notif_subject='assignment').update(notifiread_status=True)
        return models.StudentAssignment.objects.filter(student=student)

class UpdateAssignment (generics.RetrieveUpdateDestroyAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    # permission_classes = [permissions.IsAuthenticated]

class StudentDetail (generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer


# notification
class NotificationList(generics.ListCreateAPIView):
    queryset=models.Notification.objects.all()
    serializer_class=NotificationSerializer

    def get_queryset(self):
        student_id=self.kwargs['student_id']
        student = models.Student.objects.get(pk=student_id)
        return models.Notification.objects.filter(student=student, notif_for='student', notif_subject='assignment', notifiread_status=False)


# Quiz
class QuizList (generics.ListCreateAPIView):
    serializer_class = QuizSerializer
    queryset = models.Quiz.objects.all()


#Teacher QuizList
class TeacherQuizList (generics.ListAPIView):
    serializer_class = QuizSerializer
    
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Quiz.objects.filter(teacher = teacher)


# fetch the specific Teacher Course
class TeacherQuizDetail ( generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer 


class QuizDetailView (generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = QuizSerializer


# Specific Course Chapter List
class QuizQuestionsList (generics.ListCreateAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        quiz_id = self.kwargs['quiz_id']
        quiz = models.Quiz.objects.get(pk=quiz_id)
        limit = self.kwargs.get('limit', None)

        if limit is not None:
            return models.QuizQuestions.objects.filter(quiz = quiz).order_by('id')[:1]
        elif 'question_id' in self.kwargs:
            current_question = self.kwargs['question_id']
            return models.QuizQuestions.objects.filter(quiz = quiz,id__gt=current_question).order_by('id')[:1]
        else:
            return models.QuizQuestions.objects.filter(quiz = quiz)

# StudentCourseEnrollment View
class CourseQuizList (generics.ListCreateAPIView):
    queryset = models.CourseQuiz.objects.all()
    serializer_class = CourseQuizSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = models.Course.objects.get(pk=course_id)
            return models.CourseQuiz.objects.filter(course=course)

def fetch_quiz_assign_status(request, quiz_id, course_id):
    quiz = models.Quiz.objects.filter(id=quiz_id).first()
    course = models.Course.objects.filter(id=course_id).first()
    assignStatus = models.CourseQuiz.objects.filter(course=course, quiz=quiz).count()

    if assignStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

# StudentCourseEnrollment View
class AttemptQuizList (generics.ListCreateAPIView):
    queryset = models.AttemptQuiz.objects.all()
    serializer_class = AttemptQuizSerializer


def fetch_quiz_attempt_status(request, quiz_id, student_id):
    quiz = models.Quiz.objects.filter(id=quiz_id).first()
    student = models.Student.objects.filter(id=student_id).first()
    attemptStatus = models.AttemptQuiz.objects.filter(student=student, question__quiz=quiz).count()

    if attemptStatus > 0:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})