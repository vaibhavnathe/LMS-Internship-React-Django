import React from 'react'

export const StudentLogout = () => {
    localStorage.removeItem('studentLoginStatus');
    localStorage.removeItem('studentId');
    window.location.href = '/user-login';

    return (
        <div>

        </div>
    )
}
