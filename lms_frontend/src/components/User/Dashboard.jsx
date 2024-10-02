import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function Dashboard() {

    const [dashboardData, setDashboardData] = useState([]);
    const studentId = localStorage.getItem('studentId');

    useEffect(() => {
        // Fetch Courses
        const fetchCourses = async() => {
            try{
                const res = await axios.get(`${baseUrl}/student/dashboard/${studentId}`)
                if(res){
                    // console.log("result : ", res);
                    setDashboardData(res.data);
                }
            }
            catch(error){
                console.log(error);
            }
        }

        fetchCourses();
    },[])
    
    return (
        <div className='container mt-4'>
            
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar/>
                </aside>
                <section className='col-md-9'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='card border-primary'>
                                <h5 className='card-header bg-primary text-white'>Enrolled Courses</h5>
                                <div className='card-body'>
                                    <h3><Link to='/my-courses'>{dashboardData.enrolled_courses}</Link></h3>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-4'>
                            <div className='card border-success'>
                                <h5 className='card-header bg-success text-white'>Favourite Courses</h5>
                                <div className='card-body'>
                                    <h3><Link to='/favourite-courses'>{dashboardData.favourite_courses}</Link></h3>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-4'>
                            <div className='card border-info'>
                                <h5 className='card-header bg-info text-white'>Assignments</h5>
                                <div className='card-body'>
                                    <h5>
                                        <Link to='/my-assignments'>
                                            Completed : {dashboardData.complete_assignments}, 
                                            Pending : {dashboardData.pending_assignments}
                                        </Link>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
