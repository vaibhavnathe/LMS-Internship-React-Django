import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function Login() {

    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const [studentLoginData, setStudentLoginData] = useState({
        email: '',
        password: ''
    });

    // handleChange Handler
    const handleChange = (event) => {
        setStudentLoginData({
            ...studentLoginData,
            [event.target.name]: event.target.value
        })
    }

    // Submit Handler
    const submitForm = async (event) => {
        event.preventDefault();

        const studentFormData = new FormData();
        studentFormData.append('email', studentLoginData.email);
        studentFormData.append('password', studentLoginData.password);

        try {
            const response = await axios.post(`${baseUrl}/student-login`, studentFormData);
            console.log(response.data);

            if (response.data.bool == true) {
                localStorage.setItem('studentLoginStatus', true);
                localStorage.setItem('studentId', response.data.student_id);

                toast.success('Login Successful!');
                setTimeout(() => {
                    window.location.href = '/user-dashboard';
                }, 1000); // Delay to ensure toast message is visible

            }
            else {
                setErrorMsg('Invalid Email or Password!');
                toast.error('Invalid Email or Password!');
            }


        } catch (error) {
            console.log(error);
            toast.error('Login Failed!');
        }
    }

    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    
    useEffect(() => {
        document.title = "Student Login"
        if (studentLoginStatus === 'true') {
            window.location.href = '/user-dashboard';
        }
    });



    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className='card-header'>
                            User Login
                        </h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" onChange={handleChange} value={studentLoginData.email} className="form-control" name="email" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" onChange={handleChange} value={studentLoginData.password} className="form-control" name="password" />
                                </div>
                                {/* <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
                                </div> */}
                                <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
