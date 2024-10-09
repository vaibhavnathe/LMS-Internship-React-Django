import React from 'react'
import TeacherSidebar from './TeacherSidebar'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

export const AddQuizQuestion = () => {

    const { quiz_id } = useParams();

    const [questionData, setQuestionData] = useState({
        quiz: quiz_id,
        question: '',
        ans1: '',
        ans2: '',
        ans3: '',
        ans4: '',
        right_ans: ''
    });

    const handleChange = (event) => {
        setQuestionData({
            ...questionData,
            [event.target.name]: event.target.value
        })
    }

    const formSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData();
        formData.append('quiz', quiz_id);
        formData.append('question', questionData.question);
        formData.append('ans1', questionData.ans1);
        formData.append('ans2', questionData.ans2);
        formData.append('ans3', questionData.ans3);
        formData.append('ans4', questionData.ans4);
        formData.append('right_ans', questionData.right_ans);

        try {
            const response = await axios.post(baseUrl + '/quiz-questions/' + quiz_id, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })

            if (response.status == 200 || response.status == 201) {
                console.log(response.data);
                Swal.fire({
                    title: 'Quiz Quetions added Successfully',
                    icon: 'success',
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false
                });

                setQuestionData({
                    quiz: quiz_id,
                    question: '',
                    ans1: '',
                    ans2: '',
                    ans3: '',
                    ans4: '',
                    right_ans: '',
                });
            }

        }
        catch (error) {
            Swal.fire({
                title: 'Error Adding Quiz Questions',
                icon: 'error',
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
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
                        <h5 className="card-header">Add Quiz</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Question</label>
                                    <input onChange={handleChange} value={questionData.question} type="text" name='question' className="form-control" id="title" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ans1" className="form-label">Ans 1</label>
                                    <input onChange={handleChange} value={questionData.ans1} type="text" name='ans1' className="form-control" id="ans1" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ans2" className="form-label">Ans 2</label>
                                    <input onChange={handleChange} value={questionData.ans2} type="text" name='ans2' className="form-control" id="ans2" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ans3" className="form-label">Ans 3</label>
                                    <input onChange={handleChange} value={questionData.ans3} type="text" name='ans3' className="form-control" id="ans3" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ans4" className="form-label">Ans 4</label>
                                    <input onChange={handleChange} value={questionData.ans4} type="text" name='ans4' className="form-control" id="ans4" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="right_ans" className="form-label">Right Ans</label>
                                    <input onChange={handleChange} value={questionData.right_ans} type="text" name='right_ans' className="form-control" id="right_ans" />

                                </div>

                                <div className='mt-3'>
                                    <button className='btn btn-primary' onClick={formSubmit} type='button'>Submit</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    )
}
