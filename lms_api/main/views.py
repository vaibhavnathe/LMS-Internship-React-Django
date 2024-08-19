from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import  ListAPIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer
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