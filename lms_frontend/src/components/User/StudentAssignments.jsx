import Sidebar from './Sidebar'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';


export default function StudentAssignments() {

    const student_id = localStorage.getItem('studentId');
    const [assignmentData, setAssignmentData] = useState([]);

    // Fetch all the courses
    useEffect(() => {
        const fetchAllCourses = async () => {

            try {
                const assignments = await axios.get(baseUrl + `/my-assignments/${student_id}`);
                if (assignments) {
                    console.log("data : ", assignments);
                    setAssignmentData(assignments.data);
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
                        <h5 className='card-header'>My Assignments </h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Detail</th>
                                        <th>Teacher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (assignmentData.length > 0) && (
                                            assignmentData.map((assignment, index) => (
                                                <tr key={index}>
                                                    <td>{assignment.title}</td>
                                                    <td>{assignment.detail}</td>
                                                    <td><Link to={`/teacher-detail/${assignment.teacher.id}`}> {assignment.teacher.full_name}</Link></td>
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
