import Sidebar from './Sidebar'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';


export default function TakeQuiz() {

    const studentId = localStorage.getItem('studentId');

    const { quiz_id } = useParams();

    const [questionData, setQuestionData] = useState([]);

    // Fetch all the courses
    useEffect(() => {
        const getAllQuetions = async () => {

            try {
                const questions = await axios.get(baseUrl + `/quiz-questions/${quiz_id}/1`);
                if (questions) {
                    setQuestionData(questions.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getAllQuetions();

    }, [])

    const submitAnswer = async(question_id, right_ans) => {

        const formData = new FormData();
        formData.append('student', studentId);
        formData.append('quiz', quiz_id);
        formData.append('question', question_id);
        formData.append('right_ans', right_ans);

        try {
            const response = await axios.post(baseUrl + '/attempt-quiz/', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })

            if (response.status == 200 || response.status == 201) {
                try {
                    const questions = await axios.get(baseUrl + `/quiz-questions/${quiz_id}/next-question/${question_id}`);
                    if (questions) {
                        setQuestionData(questions.data);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    return (

        <div className='container mt-4'>
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar />
                </aside>
                <section className='col-md-9'>

                    {
                        (questionData.length > 0) && (
                            questionData.map((question, index) => (
                                <div className="card" key={index}>
                                    <h5 className='card-header'>{question.question}</h5>
                                    <div className="card-body">
                                        <table className="table table-bordered">

                                            <tbody>

                                                <tr>
                                                    <td><button onClick={() => submitAnswer(question.id, question.ans1)} className='btn btn-outline-secondary '>{question.ans1}</button></td>
                                                </tr>
                                                <tr>
                                                    <td><button onClick={() => submitAnswer(question.id, question.ans2)} className='btn btn-outline-secondary '>{question.ans2}</button></td>
                                                </tr>
                                                <tr>
                                                    <td><button onClick={() => submitAnswer(question.id, question.ans3)} className='btn btn-outline-secondary '>{question.ans3}</button></td>
                                                </tr>
                                                <tr>
                                                    <td><button onClick={() => submitAnswer(question.id, question.ans4)} className='btn btn-outline-secondary '>{question.ans4}</button></td>
                                                </tr>

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            )))
                    }


                </section>
            </div>
        </div>


    )
}
