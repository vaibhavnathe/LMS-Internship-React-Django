import React, { useEffect, useState } from 'react'
import TeacherSidebar from './TeacherSidebar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

import toast, { Toaster } from 'react-hot-toast';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function TeacherProfileSetting() {

    const teacherId = localStorage.getItem('teacherId');

    const [teacherData, setTeacherData] = useState({
        'full_name': '',
        'email': '',
        'qualification': '',
        'mobile_no': '',
        'profile_img':'',
        'p_img':'',
        'skills': '',
        'status':''
    });

    useEffect(() => {

        document.title = "Teacher Profile"

        // Fetch current teacher data
        const fetchTeacherData = async () => {
            try {
                const teacherData = await axios.get(baseUrl + `/teacher/${teacherId}`);
                if (teacherData) {
                    // console.log(chapters.data);
                    setTeacherData({
                        full_name: teacherData.data.full_name,
                        email: teacherData.data.email,
                        qualification: teacherData.data.qualification,
                        mobile_no: teacherData.data.mobile_no,
                        skills: teacherData.data.skills,
                        profile_img: teacherData.data.profile_img,
                        p_img: '',
                    });

                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchTeacherData();

    }, [])

    // Change Element value
    const handleChange = (event) => {

        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.value
        })
    }

    const handleFileChange = (event) => {
        setTeacherData({
            ...teacherData,
            [event.target.name]: event.target.files[0]
        })
    }

    // submit Form Handler
    const submitForm = (event) => {
        event.preventDefault(); // Prevent the default form submission

        const teacherFormData = new FormData();
        teacherFormData.append("full_name", teacherData.full_name);
        teacherFormData.append("email", teacherData.email);
        teacherFormData.append("qualification", teacherData.qualification);
        teacherFormData.append("mobile_no", teacherData.mobile_no);
        teacherFormData.append("skills", teacherData.skills);

        if (teacherData.p_img !== '') {
            teacherFormData.append('profile_img', teacherData.p_img, teacherData.p_img.name);
        }

        try {
            axios.put(baseUrl + `/teacher/${teacherId}/`, teacherFormData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log("data : ", response);
                if(response.status == 200){
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
                // window.location.reload();
            })
            

        } catch (error) {
            console.log(error);
            setTeacherData({
                'status': 'error'
            })
                (toast.error('Something Went Wrong!'))
        }
    }



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
                        <h5 className="card-header">Profile Setting</h5>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label htmlFor="staticName" className="col-sm-2 col-form-label">Full Name</label>
                                <div className="col-sm-10">
                                    <input value={teacherData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control" id="staticName" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input value={teacherData.email} onChange={handleChange} name="email" type="email" className="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="video" className="col-sm-2 col-form-label">Profile Image</label>
                                <div className="col-sm-10">
                                    <input onChange={handleFileChange} type="file" name='p_img' className="form-control" id="video" />
                                    {
                                        teacherData.profile_img &&
                                        <p className='mt-2'>
                                            <img src={teacherData.profile_img} width={300} alt={teacherData.full_name}/>
                                        </p>
                                    }
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Skills</label>
                                <div className="col-sm-10">
                                    <textarea value={teacherData.skills} onChange={handleChange} name="skills" type="text" className="form-control" id="inputPassword" />
                                    <p className='form-text'>
                                        Php, Python, Javascript, etc.
                                    </p>
                                </div>

                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Qualification</label>
                                <div className="col-sm-10">
                                    <textarea value={teacherData.qualification} onChange={handleChange} name="qualification" type="text" className="form-control" id="inputPassword" />
                                    <p className='form-text'>
                                        BE/B-Tech | MCA
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
