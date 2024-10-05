import React from 'react'
import TeacherSidebar from './TeacherSidebar'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

export const AddAssignment = () => {

    const { student_id } = useParams();
    const { teacher_id } = useParams();

    const [assignmentData, setAssignmentData] = useState({
        title: '',
        detail: '',
        video: '',
        remarks: ''
    });

    const handleChange = (event) => {
        setAssignmentData({
            ...assignmentData,
            [event.target.name]: event.target.value
        })
    }

    const formSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData();
        formData.append('teacher', teacher_id);
        formData.append('title', assignmentData.title);
        formData.append('detail', assignmentData.detail);
        formData.append('student', student_id);

        try {
            const response = await axios.post(`${baseUrl}/student-assignment/${teacher_id}/${student_id}`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: 'Assignment has been added',
                    icon: 'success',
                    toast: true,
                    timer: 7000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false
                });

                const notifData = new FormData();
                notifData.append('teacher',teacher_id);
                notifData.append('notif_subject','assignment');
                notifData.append('notif_for','student');
                notifData.append('student',student_id);

                axios.post(`${baseUrl}/save-notification/`, notifData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                .then((res) => {
                    console.log("Notification Added");
                })
            }

            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='container mt-4'>
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className="card">
                        <h5 className="card-header">Add Assignment</h5>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input onChange={handleChange} type="text" name='title' className="form-control" id="title" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="detail" className="form-label">detail</label>
                                <textarea onChange={handleChange} type="text" name='detail' className="form-control" id="detail" />

                            </div>

                            <div className='mt-3'>
                                <button className='btn btn-primary' onClick={formSubmit} type='button'>Submit</button>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    )
}
