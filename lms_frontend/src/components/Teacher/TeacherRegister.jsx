import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function TeacherRegister() {

    const [teacherData, setTeacherData] = useState({
        'full_name' : '',
        'email' : '',
        'password' : '',
        'qualification' : '',
        'mobile_no' : '',
        'skills' : '',
        'status' : '',
    });

    // Change Element value
    const handleChange = (event) => {
       
        setTeacherData({
            ...teacherData,
            [event.target.name] : event.target.value
        })
    }

    // submit Form Handler
    const submitForm = (event) => {
        event.preventDefault(); // Prevent the default form submission

        const teacherFormData = new FormData();
        teacherFormData.append("full_name", teacherData.full_name);
        teacherFormData.append("email", teacherData.email);
        teacherFormData.append("password", teacherData.password);
        teacherFormData.append("qualification", teacherData.qualification);
        teacherFormData.append("mobile_no", teacherData.mobile_no);
        teacherFormData.append("skills", teacherData.skills);

        try{
            axios.post(baseUrl + '/teacher/', teacherFormData).then((response) => {
                setTeacherData({
                    'full_name' : '',
                    'email' : '',
                    'password' : '',
                    'qualification' : '',
                    'mobile_no' : '',
                    'skills' : '',
                    'status' : 'success',
                });
            })
            toast.success('Thanks for your Registration!')
            
        }catch(error){
            console.log(error);
            setTeacherData({
                'status' : 'error'
            })
            (toast.error('Something Went Wrong!'))
        }
    }

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    
    if(teacherLoginStatus){
        window.location.href = '/teacher-dashboard';
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">

                    {/* {teacherData.status === 'success' && (toast.success('Registration successfull'))}
                    {teacherData.status === 'error' && } && (toast.error('Something Went Wrong!'))*/}
                                    

                    <div className="card">
                        <h5 className='card-header'>
                            Teacher Register
                        </h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                                    <input onChange={handleChange} type="text" className="form-control" name="full_name" value={teacherData.full_name} aria-describedby="emailHelp" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input onChange={handleChange} type="email" className="form-control" name="email" value={teacherData.email} aria-describedby="emailHelp" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input onChange={handleChange} type="password" className="form-control" name="password" value={teacherData.password} id="exampleInputPassword1" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Qualification</label>
                                    <input onChange={handleChange} type="text" className="form-control" name="qualification" value={teacherData.qualification} aria-describedby="emailHelp" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Mobile number</label>
                                    <input onChange={handleChange} type="number" className="form-control" name="mobile_no" value={teacherData.mobile_no} aria-describedby="emailHelp" />
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Skills</label>
                                    <textarea onChange={handleChange} name="skills" value={teacherData.skills} className='form-control'></textarea>
                                    <div className="form-text">Php, Python , Javascript etc.</div>
                                </div>

                                <button onClick={submitForm} type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
