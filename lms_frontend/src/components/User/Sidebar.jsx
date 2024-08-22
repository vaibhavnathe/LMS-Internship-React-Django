import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {

    return (

        
        <div className="card">
            
            <div className="list-group list-group-flush">

                <Link to='/user-dashboard' className="list-group-item list-group-item-action">Dashboard</Link>
                <Link to='/my-courses' className="list-group-item list-group-item-action">My Courses</Link>
                <Link to='/favourite-courses' className="list-group-item list-group-item-action">Favourite Courses</Link>
                <Link to='/recommended-courses' className="list-group-item list-group-item-action">Recommended Courses</Link>
                <Link to='/profile-setting' className="list-group-item list-group-item-action">Profile Setting</Link>
                <Link to='/change-password' className="list-group-item list-group-item-action">Change password</Link>
                <Link to='/user-logout' className="list-group-item list-group-item-action text-danger">Log Out</Link>
            </div>
        </div>
    )
}
