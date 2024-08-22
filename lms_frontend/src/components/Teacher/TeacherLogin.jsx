import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function TeacherLogin() {

    const [errorMsg, setErrorMsg] = useState('');

    const [teacherLoginData, setTeacherLoginData] = useState({
        email:'',
        password:''
    });

    const handleChange = (event) => {
        setTeacherLoginData({
            ...teacherLoginData,
            [event.target.name] : event.target.value
        })
    }

    const submitForm = async(event) => {
        event.preventDefault();

        const teacherFormData = new FormData();
        teacherFormData.append('email', teacherLoginData.email);
        teacherFormData.append('password', teacherLoginData.password);

       try{
            const response = await axios.post(`${baseUrl}/teacher-login`, teacherFormData);
            console.log(response.data);

            if(response.data.bool == true){
                localStorage.setItem('teacherLoginStatus', true);
                localStorage.setItem('teacherId', response.data.teacher_id);
                
                toast.success('Login Successful!');
                setTimeout(() => {
                    window.location.href = '/teacher-dashboard';
                }, 1000); // Delay to ensure toast message is visible
                
            }
            else{
                setErrorMsg('Invalid Email or Password!');
                toast.error('Invalid Email or Password!');
            }
           

       }catch(error){
            console.log(error);
            toast.error('Login Failed!');
       }  
    }

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    // console.log(teacherLoginStatus);
    

    useEffect(() => {
        document.title = "Teacher login"
        if(teacherLoginStatus === 'true'){
            window.location.href = '/teacher-dashboard';
        }
    });

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    
                    <div className="card">
                        <h5 className='card-header'>
                            Teacher Login
                        </h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" onChange={handleChange} className="form-control" name="email" value={teacherLoginData.email} aria-describedby="emailHelp"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password"  onChange={handleChange} className="form-control" name="password" value={teacherLoginData.password}/>
                                </div>
                                {/* <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
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
