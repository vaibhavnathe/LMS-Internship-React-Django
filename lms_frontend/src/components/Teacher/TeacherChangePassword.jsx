import React, { useEffect, useState } from 'react';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function TeacherChangePassword() {
    const teacherId = localStorage.getItem('teacherId');

    const [teacherData, setTeacherData] = useState({
        password: '',
    });
    const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

    useEffect(() => {
        document.title = "Teacher Change Password";
    }, []);

    const handleChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value,
        });
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Submit Form Handler
    const submitForm = async (event) => {
        event.preventDefault();

        const teacherFormData = new FormData();
        teacherFormData.append("password", teacherData.password);

        try {
            const response = await axios.post(`${baseUrl}/teacher/change-password/${teacherId}/`, teacherFormData);
            console.log("Response data:", response.data);

            if (response.data.bool) {
                Swal.fire({
                    title: 'Password has been updated',
                    icon: 'success',
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            } else {
              
                Swal.fire({
                    title: 'Failed to update password',
                    icon: 'error',
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }

            setTimeout(() => {
                window.location.href = '/teacher-logout';
            },3000)
        } catch (error) {
            console.error("Error occurred:", error);
            toast.error('Something went wrong!');
        }
    };

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');

    if (!teacherLoginStatus) {
        window.location.href = '/teacher-login';
    }

    return (
        <div className='container mt-4'>
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className="card">
                        <h5 className="card-header">Change Password</h5>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                                <div className="col-sm-10">
                                    <input
                                        value={teacherData.password}
                                        onChange={handleChange}
                                        name="password"
                                        type={passwordVisible ? "text" : "password"}
                                        className="form-control"
                                        id="inputPassword"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-link"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <hr />
                            <button onClick={submitForm} className='btn btn-primary'>Update</button>
                        </div>
                    </div>
                </section>
            </div>
            <Toaster /> {/* Ensure toast notifications work */}
        </div>
    );
}
