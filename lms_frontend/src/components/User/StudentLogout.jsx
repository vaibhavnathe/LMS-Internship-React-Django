import React from 'react'

export const StudentLogout = () => {
    localStorage.removeItem('studentLoginStatus');
    window.location.href = '/user-login';

    return (
        <div>

        </div>
    )
}
