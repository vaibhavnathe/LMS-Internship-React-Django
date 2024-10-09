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
                                                    <td>
                                                        <Link to={`/all-chapters/${course.id}`}>{course.title}</Link>
                                                        <br />
                                                        {
                                                            course.course_rating ? (<p> {course.course_rating}/5</p>) : (<p> 0/5</p>)
                                                        }
                                                    </td>
                                                    <td><img src={course.featured_img} width={80} className='rounded' alt={course.title}/></td>
                                                    <td><Link to={`/enrolled-students/${course.id}`}> {course.total_enrolled_students} </Link></td>
                                                    <td>
                                                       
                                                        <Link to={`/edit-course/${course.id}`}><button className='btn btn-info btn-md  '>Edit</button></Link>
                                                        <Link to={`/add-chapter/${course.id}`}><button className='btn btn-success btn-md  ms-2 '>Add Chapter</button></Link>
                                                        <Link to={`/assign-quiz/${course.id}`}><button className='btn btn-warning btn-md  ms-2 '>Assign Quiz</button></Link>
                                                        <button className='btn btn-danger btn-md ms-2'>Delete</button>

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
