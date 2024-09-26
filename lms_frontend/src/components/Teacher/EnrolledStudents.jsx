import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function EnrolledStudents() {

    const {course_id} = useParams();            

    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        const getAllStudents = async () => {

            try {
                const students = await axios.get(baseUrl + `/fetch-enrolled-students/${course_id}`);
                if (students) {
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
                        <h5 className='card-header'>Enrolled Student List</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Intersted Categories</th>
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
