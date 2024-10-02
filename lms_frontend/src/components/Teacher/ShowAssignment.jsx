import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';


export const ShowAssignment = () => {

    const { teacher_id } = useParams();
    const { student_id } = useParams();

    const [assignmentData, setAssignmentData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);

    // Fetching the chapter data
    useEffect(() => {
        const getAllChapters = async () => {

            try {
                const assignments = await axios.get(baseUrl + `/student-assignment/${teacher_id}/${student_id}`);
                if (assignments) {
                    // console.log(assignments.data);
                    setAssignmentData(assignments.data);
                    setTotalResult(assignments.data.length);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getAllChapters();

    }, [])

    return (

        <div className='container mt-4'>
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>

                <section className='col-md-9'>
                    <div className="card">
                        <h5 className='card-header'>All Assignments ({totalResult}) <Link className='btn btn-success btn-sm float-end' to={`/add-assignment/${teacher_id}/${student_id}`}>Add Assignment</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th> Student Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (assignmentData.length > 0) && (
                                            assignmentData.map((assignment, index) => (
                                                <tr key={index}>
                                                    <td>{assignment.title}</td>
                                                    <td>
                                                    {
                                                        assignment.student_status == true
                                                            ? ((<span className='badge bg-success'>Completed</span>))
                                                            : ((<span className='badge bg-warning'>Pending</span>))
                                                    }
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
