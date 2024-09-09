from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import  ListAPIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer, StudentSerializer, StudentCourseEnrollSerializer, CourseRatingSerializer
from django.http import JsonResponse
from . import models

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




# ******* Student Data ********* 

# fetch all the list of Stdent
class StudentList (generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes = [permissions.IsAuthenticated]

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
        course_id = self.kwargs['course_id']
        course = models.Course.objects.get(pk=course_id)
        return models.StudentCourseEnrollment.objects.filter(course = course)

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