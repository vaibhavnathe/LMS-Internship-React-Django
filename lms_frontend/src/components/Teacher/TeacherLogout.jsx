import React from 'react'

export const TeacherLogout = () => {

    localStorage.removeItem('teacherLoginStatus');
    window.location.href = '/teacher-login';

  return (
    <div>
        
    </div>
  )
}
