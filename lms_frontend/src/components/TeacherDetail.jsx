import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import logo from '../assests/logo.jpeg'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function TeacherDetail() {

    const {teacher_id} = useParams();

    const [teacherData, setTeacherData] = useState(null);
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        const fetchTeacherData = async() => {
            try{
                const response = await axios.get(`${baseUrl}/teacher/${teacher_id}`);
                if(response){
                    // console.log(response.data);
                    setTeacherData(response.data);
                    setCourseData(response.data.teacher_courses)
                }
            }
            catch(error){
                console.log("Error while fetching the Teacher Data!");
                console.log(error);
            }
        }
        fetchTeacherData();

    },[])

    if (!teacherData) {
        return <div>Loading...</div>;
    }


    return (
        <div className="container mt-3">

            <div className="row">
                <div className="col-4">
                    <img src={logo} className="img-thumbnail    " alt="Teacher Image" />
                </div>
                <div className="col-8">
                    <h3>{teacherData.full_name}</h3>
                    <p>{teacherData.detail}</p>
                    <p className='fw-bold'>Skills: <Link to='/category/php'>{teacherData.skills}</Link> </p>
                    <p className='fw-bold'>Recent Course:  <Link to='/teacher-detail/1'>ReactJs Course</Link></p>
                    <p className='fw-bold'>Rating: 4.5/5</p>
                </div>
            </div>

            {/* Course Videos*/}
            <div className="card mt-4">
                <h5 className="card-header">
                    Course List
                </h5>
                <div className="list-group list-group-flush">

                    {
                        courseData.length > 0 && (
                            courseData.map((course, index) => (
                                <Link to={`/detail/${course.id}`} key={index} className='list-group-item list-group-item-action'>{course.title}</Link>
                            ))
                        )
                    }

                </div>
            </div>


        </div>
    )
}
