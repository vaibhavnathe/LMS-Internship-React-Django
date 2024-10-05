from django.urls import path
from . import views

urlpatterns = [
    # Teacher
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/dashboard/<int:pk>', views.TeacherDashboard.as_view()),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher-login', views.teacher_login),
    path('teacher/change-password/<int:teacher_id>/', views.teacher_change_password),



    # Student
    path('student/', views.StudentList.as_view()),
    path('student-login', views.student_login),
    path('student-enroll-course/', views.StudentCourseEnrollmentList.as_view(),name='student-enroll-course'),
    path('fetch-enroll-status/<int:student_id>/<int:course_id>', views.fetch_enroll_status),
    path('fetch-enrolled-students/<int:course_id>', views.EnrolledStudentList.as_view()),
    path('fetch-enrolled-courses/<int:student_id>', views.EnrolledStudentList.as_view()),
    path('fetch-recommended-courses/<int:studentId>', views.CourseList.as_view()),
    path('fetch-all-enrolled-students/<int:teacher_id>', views.EnrolledStudentList.as_view()),
    path('fetch-rating-status/<int:student_id>/<int:course_id>', views.fetch_rating_status),
    path('student-add-favourite-course/', views.StudentFavouriteCourseList.as_view()),
    path('student-remove-favourite-course/<int:course_id>/<int:student_id>', views.remove_favourite_course),
    path('fetch-favourite-status/<int:student_id>/<int:course_id>', views.fetch_favourite_status),
    path('fetch-favourite-courses/<int:student_id>', views.StudentFavouriteCourseList.as_view()),
    path('student-assignment/<int:teacher_id>/<int:student_id>', views.AssignmentList.as_view()),
    path('my-assignments/<int:student_id>', views.MyAssignmentList.as_view()),
    path('update-assignment/<int:pk>', views.UpdateAssignment.as_view()),
    path('student/dashboard/<int:pk>', views.StudentDashboard.as_view()),
    path('student/<int:pk>/', views.StudentDetail.as_view()),

    # Category
    path('category/', views.CategoryList.as_view()),

    # Course
    path('course/', views.CourseList.as_view()),

     # Specific Course detail
    path('course/<int:pk>', views.CourseDetailView.as_view()),

    # Chapter
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),

    # Specific Course Chapter
    path('course-chapters/<int:course_id>', views.CourseChapterList.as_view()),

    # Teacher Course
    path('teacher-courses/<int:teacher_id>', views.TeacherCourseList.as_view()),

    # Course detail
    path('teacher-course-detail/<int:pk>', views.TeacherCourseDetail.as_view()),

    # Course Rating
     path('course-rating/', views.CourseRatingList.as_view()),
]
