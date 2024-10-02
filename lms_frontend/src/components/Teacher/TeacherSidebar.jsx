import React from 'react'
import { Link } from 'react-router-dom'

export default function TeacherSidebar() {

    return (

        
        <div className="card">
            
            <div className="list-group list-group-flush">

                <Link to='/teacher-dashboard' className="list-group-item list-group-item-action"><strong>Dashboard</strong></Link>
                <Link to='/teacher-courses' className="list-group-item list-group-item-action">My Courses</Link>
                <Link to='/add-course' className="list-group-item list-group-item-action">Add Courses</Link>
                <Link to='/teacher-users' className="list-group-item list-group-item-action">My Users</Link>
                <Link to='/teacher-profile-setting' className="list-group-item list-group-item-action">Profile Setting</Link>
                <Link to='/teacher-change-password' className="list-group-item list-group-item-action">Change password</Link>
                <Link to='/teacher-logout' className="list-group-item list-group-item-action text-danger">Log Out</Link>
            </div>
        </div>
    )
}
