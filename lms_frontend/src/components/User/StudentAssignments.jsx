import Sidebar from './Sidebar'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const baseUrl = 'http://127.0.0.1:8000/api';


export default function StudentAssignments() {

    const student_id = localStorage.getItem('studentId');
    const [assignmentData, setAssignmentData] = useState([]);
    const [assignmentStatus, setAssignmentStatus] = useState('');

    // Fetch all the courses
    useEffect(() => {
        const fetchAllCourses = async () => {

            try {
                const assignments = await axios.get(baseUrl + `/my-assignments/${student_id}`);
                if (assignments) {
                    // console.log("data : ", assignments);
                    setAssignmentData(assignments.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchAllCourses();

    }, [])


    const markAsDone = async (assignment_id, title, detail, student, teacher) => {

        const formData = new FormData();
        formData.append('student_status', true);
        formData.append('title', title);
        formData.append('detail', detail);
        formData.append('student', student);
        formData.append('teacher', teacher);

        try {
            const response = await axios.put(baseUrl + '/update-assignment/' + assignment_id, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (response.status == 200 || response.status == 201) {
                setAssignmentStatus('success');
                toast.success("You have Successfully Completed this Assignment");
                console.log(response.data);
     
                setTimeout(() => {
                    window.location.reload();
                }, 2000); // Adjust the delay time (in milliseconds) as needed
            }

        }
        catch (error) {
            toast.error("Something Went Wrong!");
            console.log(error);
        }
    }

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
                                        <th>Action</th>
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
                                                    <td>
                                                        {
                                                            assignment.student_status == true
                                                                
                                                                ? ((<span className='badge bg-primary'>Completed</span>))
                                                                :(<button onClick={() => markAsDone(assignment.id, assignment.title, assignment.detail, assignment.student.id, assignment.teacher.id)}
                                                                className='btn btn-success btn-sm'>Mark as Done</button>)
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
