import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import '../App.css';
import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/api';

export const CategoryCourses = () => {

    const { category_slug } = useParams();

    const [courseData, setCourseData] = useState([]);


    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/course/?category=${category_slug}`)
                if (response) {
                    setCourseData(response.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchCourseData();
    }, [])

    // console.log(courseData);

    return (
        <div className='container mt-4'>
            <h3 className=' pb-1 mb-4'>
                {category_slug} Courses
            </h3>
            <div className='row'>
               
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row row-cols-1 row-cols-md-3 g-4 mb-4'>
                                {courseData.length > 0 && courseData.map((course, index) => (
                                    <div className="col" key={index}>
                                        <div className="card fixed-size-card">
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
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


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
