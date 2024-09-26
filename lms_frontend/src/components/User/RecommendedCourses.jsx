import Sidebar from './Sidebar'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';


export default function RecommendedCourses() {

    const studentId = localStorage.getItem('studentId');

    const [courseData, setCourseData] = useState([]);

    // Fetch all the courses
    useEffect(() => {
        const fetchAllCourses = async () => {

            try {
                const courses = await axios.get(baseUrl + `/fetch-recommended-courses/${studentId}`);
                if (courses) {
                    console.log("data : ", courses);
                    setCourseData(courses.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchAllCourses();

    }, [])

    return (

        <div className='container mt-4'>
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar />
                </aside>
                <section className='col-md-9'>
                    <div className="card">
                        <h5 className='card-header'>My Courses </h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Technologies</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (courseData.length > 0) && (
                                            courseData.map((data, index) => (
                                                <tr key={index}>
                                                    <td><Link to={`/detail/${data.id}`}>{data.title}</Link></td>
                                                    <td>{data.techs}</td>
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
