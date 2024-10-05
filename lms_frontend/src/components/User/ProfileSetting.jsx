import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from './Sidebar'

import toast, { Toaster } from 'react-hot-toast';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function ProfileSetting() {

    const studentId = localStorage.getItem('studentId');

    const [studentData, setStudentData] = useState({
        'full_name': '',
        'email': '',
        'username': '',
        'interested_categories': '',
        'profile_img':'',
        'p_img':'',
    });

    useEffect(() => {

        document.title = "My Profile"

        // Fetch current teacher data
        const fetchStudentData = async () => {
            try {
                const student = await axios.get(baseUrl + `/student/${studentId}`);
                if (student) {
                    // console.log(student.data);
                    setStudentData({
                        full_name: student.data.full_name,
                        email: student.data.email,
                        username: student.data.username,
                        interested_categories: student.data.interested_categories,
                        profile_img: student.data.profile_img,
                        p_img: '',
                    });

                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchStudentData();

    }, [])

    // Change Element value
    const handleChange = (event) => {

        setStudentData({
            ...studentData,
            [event.target.name]: event.target.value
        })
    }

    const handleFileChange = (event) => {
        setStudentData({
            ...studentData,
            [event.target.name]: event.target.files[0]
        })
    }

    // submit Form Handler
    const submitForm = (event) => {
        event.preventDefault(); // Prevent the default form submission

        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name);
        studentFormData.append("email", studentData.email);
        studentFormData.append("username", studentData.username);
        studentFormData.append("interested_categories", studentData.interested_categories);

        if (studentData.p_img !== '') {
            studentFormData.append('profile_img', studentData.p_img, studentData.p_img.name);
        }

        try {
            axios.put(baseUrl + `/student/${studentId}/`, studentFormData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log("data : ", response);
                if(response.status === 200){
                    Swal.fire({
                        title: 'Data has been updated',
                        icon: 'success',
                        toast: true,
                        timer: 3000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                }
                window.location.reload();
            })
            

        } catch (error) {
            console.log(error);
            setStudentData({
                'status': 'error'
            })
                (toast.error('Something Went Wrong!'))
        }
    }



    const studentLoginStatus = localStorage.getItem('studentLoginStatus');

    if (!studentLoginStatus) {
        window.location.href = '/user-login';
    }


    return (
        <div className='container mt-4'>
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar />
                </aside>
                <section className='col-md-9'>
                    <div className="card">
                        <h5 className="card-header">Profile Setting</h5>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label htmlFor="staticName" className="col-sm-2 col-form-label">Full Name</label>
                                <div className="col-sm-10">
                                    <input value={studentData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control" id="staticName" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input value={studentData.email} onChange={handleChange} name="email" type="email" className="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="video" className="col-sm-2 col-form-label">Profile Image</label>
                                <div className="col-sm-10">
                                    <input onChange={handleFileChange} type="file" name='p_img' className="form-control" id="video" />
                                    {
                                        studentData.profile_img &&
                                        <p className='mt-2'>
                                            <img src={studentData.profile_img} width={300} alt={studentData.full_name}/>
                                        </p>
                                    }
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Username</label>
                                <div className="col-sm-10">
                                    <input value={studentData.username} onChange={handleChange} name="username" type="text" className="form-control" id="inputPassword" />
                                </div>

                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" name='interested_categories' className="col-sm-2 col-form-label">Interested Categories</label>
                                <div className="col-sm-10">
                                    <textarea value={studentData.interested_categories} onChange={handleChange} name="interested_categories" type="text" className="form-control" id="inputPassword" />
                                    <p className='form-text'>
                                        Php, Python, JavaScript, ML
                                    </p>
                                </div>

                            </div>
                            <hr />
                            <button className='btn btn-primary' onClick={submitForm}>Update</button>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    )
}
