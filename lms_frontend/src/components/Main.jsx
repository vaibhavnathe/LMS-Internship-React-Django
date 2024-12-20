import React from 'react'
import { Home } from './Home'
import Header from './Header'
import { Footer } from './Footer'
import { Route, Routes as Switch } from 'react-router-dom'
import About from './About'
import CourseDetail from './CourseDetail'
import TeacherDetail from './TeacherDetail'

// Users
import Login from './User/Login'
import Register from './User/Register'
import Dashboard from './User/Dashboard'
import MyCourses from './User/MyCourses'
import FavouriteCourses from './User/FavouriteCourses'
import RecommendedCourses from './User/RecommendedCourses'
import ProfileSetting from './User/ProfileSetting'
import ChangePassword from './User/ChangePassword'
import { StudentLogout } from './User/StudentLogout'
import StudentAssignments from './User/StudentAssignments'

// Teachers
import TeacherLogin from './Teacher/TeacherLogin'
import TeacherRegister from './Teacher/TeacherRegister'
import TeacherDashboard from './Teacher/TeacherDashboard'
import TeacherCourses from './Teacher/TeacherCourses'
import AddCourse from './Teacher/AddCourse'
import TeacherProfileSetting from './Teacher/TeacherProfileSetting'
import TeacherChangePassword from './Teacher/TeacherChangePassword'
import UserList from './Teacher/UserList'
import { TeacherLogout } from './Teacher/TeacherLogout'
import { AddChapter } from './Teacher/AddChapter'
import EnrolledStudents from './Teacher/EnrolledStudents'

// Course Pages
import AllCourses from './AllCourses'
import { PopularCourses } from './PopularCourses'
import { PopularTeachers } from './PopularTeachers'
import { CategoryCourses } from './CategoryCourses'
import { CourseChapters } from './Teacher/CourseChapters'
import { EditChapter } from './Teacher/EditChapter'
import EditCourse from './Teacher/EditCourse'
import { TeacherSkillCourses } from './TeacherSkillCourses'
import { AddAssignment } from './Teacher/AddAssignment'
import { ShowAssignment } from './Teacher/ShowAssignment'

// Quiz
import AddQuiz from './Teacher/AddQuiz'
import AllQuiz from './Teacher/AllQuiz'
import EditQuiz from './Teacher/EditQuiz'
import { QuizQuestions } from './Teacher/QuizQuestions'
import { AddQuizQuestion } from './Teacher/AddQuizQuestion'
import AssignQuiz from './Teacher/AssignQuiz'
import CourseQuizList from './User/CourseQuizList'
import TakeQuiz from './User/TakeQuiz'
import Search from './Search'


export const Main = () => {
  return (

    <div className='App'>

      <Header/>

      <Switch>

        {/* Users */}
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/detail/:course_id' element={<CourseDetail/>}/>
        <Route path='/user-login' element={<Login/>}/>
        <Route path='/user-logout' element={<StudentLogout/>}/>
        <Route path='/user-register' element={<Register/>}/>
        <Route path='/user-dashboard' element={<Dashboard/>}/>
        <Route path='/my-courses' element={<MyCourses/>}/>
        <Route path='/favourite-courses' element={<FavouriteCourses/>}/>
        <Route path='/recommended-courses' element={<RecommendedCourses/>}/>
        <Route path='/profile-setting' element={<ProfileSetting/>}/>
        <Route path='/change-password' element={<ChangePassword/>}/>
        <Route path='/my-assignments' element={<StudentAssignments/>}/>
        <Route path='/search/:searchString' element={<Search/>}/>

        {/* Teachers */}
        <Route path='/teacher-login' element={<TeacherLogin/>}/>
        <Route path='/teacher-register' element={<TeacherRegister/>}/>
        <Route path='/teacher-dashboard' element={<TeacherDashboard/>}/>
        <Route path='/teacher-courses' element={<TeacherCourses/>}/>
        <Route path='/enrolled-students/:course_id' element={<EnrolledStudents/>}/>
        <Route path='/add-course' element={<AddCourse/>}/>
        <Route path='/teacher-users' element={<UserList/>}/>
        <Route path='/teacher-profile-setting' element={<TeacherProfileSetting/>}/>
        <Route path='/teacher-change-password' element={<TeacherChangePassword/>}/>
        <Route path='/teacher-detail/:teacher_id' element={<TeacherDetail/>}/>
        <Route path='/teacher-logout' element={<TeacherLogout/>}/>
        <Route path='/add-chapter/:course_id' element={<AddChapter/>}/>
        <Route path='/add-assignment/:teacher_id/:student_id' element={<AddAssignment/>}/>
        <Route path='/show-assignment/:teacher_id/:student_id' element={<ShowAssignment/>}/>
        <Route path='/edit-course/:course_id' element={<EditCourse/>}/>
        <Route path='/teacher-skill-courses/:skill_name/:teacher_id' element={<TeacherSkillCourses/>}/>

        {/* List Pages */}
        <Route path='/all-courses' element={<AllCourses/>}/>
        <Route path='/popular-courses' element={<PopularCourses/>}/>
        <Route path='/popular-teachers' element={<PopularTeachers/>}/>
        <Route path='/category/:category_slug' element={<CategoryCourses/>}/>
        <Route path='/all-chapters/:course_id' element={<CourseChapters/>}/>
        <Route path='/edit-chapter/:chapter_id' element={<EditChapter/>}/>

        {/* Teacher Quiz Dashboard*/}
        <Route path='/add-quiz' element={<AddQuiz/>}/>
        <Route path='/quiz' element={<AllQuiz/>}/>
        <Route path='/edit-quiz/:quiz_id' element={<EditQuiz/>}/>
        <Route path='/all-questions/:quiz_id' element={<QuizQuestions/>}/>
        <Route path='/add-quiz-question/:quiz_id' element={<AddQuizQuestion/>}/>
        <Route path='/assign-quiz/:course_id' element={<AssignQuiz/>}/>
        
       {/* Student Quiz Dashboard */}
       <Route path='/course-quiz/:course_id' element={<CourseQuizList/>}/>
       <Route path='/take-quiz/:quiz_id' element={<TakeQuiz/>}/>

      </Switch>

      <Footer/>

    </div>
  )
}

