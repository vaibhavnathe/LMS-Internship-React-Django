import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function AssignQuiz() {

    const teacherId = localStorage.getItem('teacherId');
    const {course_id} = useParams();

    const [quizData, setQuizData] = useState([]);
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        const getAllCourse = async () => {

            try {
                const quizes = await axios.get(baseUrl + `/teacher-quiz/${teacherId}`);
                if (quizes) {
                    setQuizData(quizes.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getAllCourse();


        const fetchCourseData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/course/${course_id}`);
                if (response.data) {
                    // console.log("CourseData: ", response.data.course_chapters);
                    setCourseData(response.data);
                }
            }
            catch (error) {
                console.log("Error While Fetching Course Detail!");
                console.log(error);
            }
        }
        fetchCourseData();

    }, [])

    // Delete chapter data
    const assignQuiz = async (quiz_id) => {
        const result = await Swal.fire({
            title: 'Confirm',
            text: 'Assign Quiz',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true
        })

        if (result.isConfirmed) {
            try {
                const res = await axios.delete(`${baseUrl}/quiz/${quiz_id}`);

                if (res) {
                    Swal.fire("Success", "Data has been deleted!")
                    try {
                        const quizes = await axios.get(baseUrl + `/teacher-quiz/${teacherId}`);
                        if (quizes) {
                            setQuizData(quizes.data);
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
                }

            }
            catch (error) {
                Swal.fire("error", "Data has not been deleted!")
            }

        }
    }


    return (

        <div className='container mt-4'>
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>

                { }

                <section className='col-md-9'>
                    <div className="card">
                        <h5 className='card-header'>Assign Quiz <span className='text-primary'>({courseData.title})</span></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (quizData.length > 0) && (
                                            quizData.map((quiz, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <Link to={`/all-questions/${quiz.id}`}>{quiz.title}</Link>
                                                       
                                                    </td>
                                                    <td>

                                                        <button onClick={() => assignQuiz(quiz.id)} className='btn btn-success btn-md ms-2'>Assign Quiz</button>

                                                    </td>
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
