import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function TeacherCourses() {

    const teacherId = localStorage.getItem('teacherId');

    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        const getAllCourse = async () => {

            try {
                const courses = await axios.get(baseUrl + `/teacher-courses/${teacherId}`);
                if (courses) {
                    setCourseData(courses.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getAllCourse();

    }, [])


    return (

        <div className='container mt-4'>
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>

                { }

                <section className='col-md-9'>
                    <div className="card">
                        <h5 className='card-header'>My Courses </h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Total Enrolled</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (courseData.length > 0) && (
                                            courseData.map((course, index) => (
                                                <tr key={index}>
                                                    <td><Link to={`/all-chapters/${course.id}`}>{course.title}</Link></td>
                                                    <td><img src={course.featured_img} width={80} className='rounded' alt={course.title}/></td>
                                                    <td><Link to='/'> 320 </Link></td>
                                                    <td>
                                                        <button className='btn btn-danger btn-sm '>Delete</button>
                                                        <Link to={`/add-chapter/${course.id}`}><button className='btn btn-success btn-md  ms-2 '>Add Chapter</button></Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>


    )
}