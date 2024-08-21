import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assests/logo.jpeg'
import devops from '../assests/devops.png'
import django from '../assests/django.jpeg'
import python from '../assests/python.webp'
import axios from 'axios'
import { useState, useEffect } from 'react'

const baseUrl = 'http://127.0.0.1:8000/api';


export default function AllCourses() {

    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        const getAllCourse = async () => {

            try {
                const courses = await axios.get(`${baseUrl}/course`);
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

    // console.log(courseData);

    return (
        <div className='container mt-4'>
            <h3 className=' pb-1 mb-4'>
                Latest Courses
            </h3>
            <div className='row mb-4'>


                {
                    courseData && courseData.map((course, index) => (

                        <div className='col-md-3  mb-4' key={index}>
                            
                            <div className="card">
                                <Link to={`/detail/${course.id}`}>
                                    <img src={course.featured_img} className="card-img-top" alt={course.title} />
                                

                                <div className="card-body">
                                    <h5 className="card-title">
                                            {course.title}
                                    </h5>
                                </div>
                                </Link>

                            </div>
                        </div>
                    ))
                }




            </div>

            {/* Pagination Start */}
            <nav aria-label="Page navigation example mt-5">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    )
}
