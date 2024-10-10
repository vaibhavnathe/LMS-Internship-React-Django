import Sidebar from './Sidebar'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';


export default function TakeQuiz() {

    const studentId = localStorage.getItem('studentId');

    const [courseData, setCourseData] = useState([]);

    // Fetch all the courses
    useEffect(() => {
        const fetchAllCourses = async () => {

            try {
                const courses = await axios.get(baseUrl + `/fetch-enrolled-courses/${studentId}`);
                if (courses) {
                    // console.log("data : ", courses);
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
                        <h5 className='card-header'>Question Title</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                               
                                <tbody>


                                    <tr>
                                        <td>
                                            <input type="radio" />
                                        </td>
                                        <th>Option 1</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="radio" />
                                        </td>
                                        <th>Option 2</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="radio" />
                                        </td>
                                        <th>Option 3</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="radio" />
                                        </td>
                                        <th>Option 4</th>
                                    </tr>



                                </tbody>
                            </table>
                            <button className='btn btn-dark'>Skip</button>
                            <button className='btn btn-primary ms-2'>Submit</button>
                            
                        </div>
                    </div>
                </section>
            </div>
        </div>


    )
}
