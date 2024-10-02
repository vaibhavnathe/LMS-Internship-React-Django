import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function Register() {

    const [studentData, setStudentData] = useState({
        'full_name': '',
        'email': '',
        'password': '',
        'username': '',
        'interested_categories': '',
        'status': '',
    });

    // Change Element value
    const handleChange = (event) => {

        setStudentData({
            ...studentData,
            [event.target.name]: event.target.value
        })
    }

    const submitForm = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name);
        studentFormData.append("email", studentData.email);
        studentFormData.append("password", studentData.password);
        studentFormData.append("username", studentData.username);
        studentFormData.append("interested_categories", studentData.interested_categories);

        try {
            const response = await axios.post(baseUrl + '/student/', studentFormData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                // console.log(response);
                setStudentData({
                    'full_name': '',
                    'email': '',
                    'password': '',
                    'username': '',
                    'interested_categories': '', 
                    'status': 'success',
                });
                toast.success('Thanks for your Registration!');
            }
            else {
                throw new Error('Unexpected response status');
            }
            
        } catch (error) {
            console.error(error);
            setStudentData((prevState) => ({
                ...prevState,
                status: 'error'
            }));
            toast.error('Something Went Wrong!');
        }
    }

    useEffect(() => {
        document.title = "Student Register"
    }, [])


    return (
        <div className="container mt-4">

            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className='card-header'>
                            User Register
                        </h5>
                        <form onSubmit={submitForm}>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="full_name" className="form-label">Full Name</label>
                                    <input required type="text" onChange={handleChange} value={studentData.full_name} className="form-control" name='full_name' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input required type="email" onChange={handleChange} value={studentData.email} className="form-control" name='email' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input required type="text" onChange={handleChange} value={studentData.username} className="form-control" name='username' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input required type="password" onChange={handleChange} value={studentData.password} className="form-control" name='password' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="interested_categories" className="form-label">Interest</label>
                                    <textarea required className='form-control' onChange={handleChange} value={studentData.interested_categories} name='interested_categories'></textarea>
                                    <div className="form-text">Php, Python , Javascript etc.</div>
                                </div>

                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
