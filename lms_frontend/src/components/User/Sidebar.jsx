import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/api';

export default function Sidebar() {

    const [notifData, setnotifData] = useState([]);
    const studentId = localStorage.getItem('studentId');

    useEffect(() => {
        // Fetch Courses

        const fetchData = async() => {
            try{
                const res = await axios.get(`${baseUrl}/student/fetch-all-notifications/${studentId}`);
                if(res){
                    console.log("res : ", res);
                    setnotifData(res.data);
                }
            }
            catch(error){
                console.log(error);
            }
        }

        fetchData();
        
    },[studentId])
    

    return (

        
        <div className="card">
            
            <div className="list-group list-group-flush">

                <Link to='/user-dashboard' className="list-group-item list-group-item-action text-b"><strong>Dashboard</strong></Link>
                <Link to='/my-courses' className="list-group-item list-group-item-action">My Courses</Link>
                <Link to='/favourite-courses' className="list-group-item list-group-item-action">Favourite Courses</Link>
                <Link to='/recommended-courses' className="list-group-item list-group-item-action">Recommended Courses</Link>
                <Link to='/my-assignments' className="list-group-item list-group-item-action">Assignments <span className='float-end badge bg-danger mt-1'>{notifData.length}</span></Link>
                <Link to='/profile-setting' className="list-group-item list-group-item-action">Profile Setting</Link>
                <Link to='/change-password' className="list-group-item list-group-item-action">Change password</Link>
                <Link to='/user-logout' className="list-group-item list-group-item-action text-danger">Log Out</Link>
            </div>
        </div>
    )
}
