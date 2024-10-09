import React, { useEffect, useState } from 'react'
import TeacherSidebar from './TeacherSidebar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function EditQuiz() {

    const teacherId = localStorage.getItem('teacherId');

    const { quiz_id } = useParams();

    const [quizData, setQuizData] = useState({
        title: '',
        detail:'',
    });

    useEffect(() => {

        // Fetch current Quiz data
        const fetchQuizData = async () => {
            try {
                const quiz = await axios.get(baseUrl + `/teacher-quiz-detail/${quiz_id}`);
                if (quiz) {
                    // console.log(chapters.data);
                    setQuizData({
                        title: quiz.data.title,
                        detail:quiz.data.detail,
                    });

                }
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchQuizData();

    }, [])

    const handleChange = (event) => {
        setQuizData({
            ...quizData,
            [event.target.name]: event.target.value
        })
    }

    const formSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData();
        formData.append('teacher', teacherId);
        formData.append('title', quizData.title);
        formData.append('detail', quizData.detail);

        try {
            const response = await axios.put(baseUrl + '/teacher-quiz-detail/' + quiz_id, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })


            if (response.status == 200) {
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


            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }

    }



    return (
        <div className='container mt-4'>
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className="card">
                        <h5 className="card-header">Edit Quiz</h5>
                        <div className="card-body">
                            <form>

                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input onChange={handleChange} value={quizData.title} type="text" name='title' className="form-control" id="title" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="detail" className="form-label">Detail</label>
                                    <textarea onChange={handleChange} type="text" value={quizData.detail} name='detail' className="form-control" id="detail" />

                                </div>

                                <div className='mt-3'>
                                    <button onClick={formSubmit} className='btn btn-primary' type='submit'>Submit</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </section>
            </div>
        </div>

    )
}