import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function UserList() {

    const teacher_id = localStorage.getItem('teacherId');         

    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        const getAllStudents = async () => {

            try {
                const students = await axios.get(baseUrl + `/fetch-all-enrolled-students/${teacher_id}`);
                if (students) {
                    console.log("data : ", students);
                    setStudentData(students.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getAllStudents();

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
                        <h5 className='card-header'>All Student List</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Intersted Categories</th>
                                        <th>Assignments</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (studentData.length > 0) && (
                                            studentData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{data.student.full_name}</td>
                                                    <td> {data.student.email}</td>
                                                    <td> {data.student.username}</td>
                                                    <td>{data.student.interested_categories}</td>
                                                    <td>
                                                        <Link to={`/show-assignment/${teacher_id}/${data.student.id}`}  className='btn btn-sm btn-warning'>Assignments</Link>
                                                        <Link to={`/add-assignment/${teacher_id}/${data.student.id}`} className='btn btn-sm btn-success ms-2'>Add Assignment</Link>
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
