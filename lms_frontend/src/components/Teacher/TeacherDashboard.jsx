import React, { useEffect, useState } from 'react'
import TeacherSidebar from './TeacherSidebar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

import toast, { Toaster } from 'react-hot-toast';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function TeacherDashboard() {

    const [dashboardData, setDashboardData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');

    useEffect(() => {
        // Fetch Courses
        const fetchCourses = async() => {
            try{
                const res = await axios.get(`${baseUrl}/teacher/dashboard/${teacherId}`)
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
                    <TeacherSidebar/>
                </aside>
                <section className='col-md-9'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='card border-primary'>
                                <h5 className='card-header bg-primary text-white'>Total Courses</h5>
                                <div className='card-body'>
                                    <h3><Link to='/teacher-courses'>{dashboardData.total_teacher_courses}</Link></h3>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-4'>
                            <div className='card border-success'>
                                <h5 className='card-header bg-success text-white'>Total Students</h5>
                                <div className='card-body'>
                                    <h3><Link to='/teacher-users'>{dashboardData.total_teacher_students}</Link></h3>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-4'>
                            <div className='card border-info'>
                                <h5 className='card-header bg-info text-white'>Total Chapters</h5>
                                <div className='card-body'>
                                    <h3><Link to='/teacher-courses'>{dashboardData.total_teacher_chapters}</Link></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
