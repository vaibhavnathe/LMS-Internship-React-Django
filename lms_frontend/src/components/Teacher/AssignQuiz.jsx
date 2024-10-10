import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import CheckQuizInCourse from './CheckQuizInCourse';


const baseUrl = 'http://127.0.0.1:8000/api';

export default function AssignQuiz() {

    const teacherId = localStorage.getItem('teacherId');
    const { course_id } = useParams();

    const [quizData, setQuizData] = useState([]);
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        const getAllQuizes = async () => {

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
        getAllQuizes();


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

    //AssignQuiz Handler
    const assignQuiz = async (quiz_id) => {

        const formData = new FormData();
        formData.append('teacher', teacherId);
        formData.append('course', course_id);
        formData.append('quiz', quiz_id);

        try {
            const response = await axios.post(baseUrl + '/quiz-assign-course/', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (response.status == 200 || response.status == 201) {
                toast.success("Quiz is Successfully assigned in the Course");
                setTimeout(() => {
                    window.location.reload();
                }, 1000); // Delay to ensure toast message is visible
                
            }

        }
        catch (error) {
            toast.error("Something Went Wrong!");
            console.log(error);
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
                                                        <CheckQuizInCourse quiz={quiz.id} course={course_id}/>
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
