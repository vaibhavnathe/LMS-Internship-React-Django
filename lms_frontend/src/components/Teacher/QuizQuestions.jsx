import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';


export const QuizQuestions = () => {

    const { quiz_id } = useParams();

    const [questionData, setQuestionData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);

    // Fetching the chapter data
    useEffect(() => {
        const getAllQuetions = async () => {

            try {
                const questions = await axios.get(baseUrl + `/quiz-questions/${quiz_id}`);
                if (questions) {

                    setQuestionData(questions.data);
                    setTotalResult(questions.data.length);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getAllQuetions();

    }, [])

    // Delete chapter data
    const handleDeleteClick = async (question_id) => {
        const result = await Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this data',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true
        })

        if (result.isConfirmed) {
            try {
                const res = await axios.delete(`${baseUrl}/question/${question_id}`);

                if (res) {
                    Swal.fire("Success", "Data has been deleted!")
                    try {
                        const questions = await axios.get(baseUrl + `/quiz-questions/${quiz_id}`);
                        if (questions) {
                            setQuestionData(questions.data);
                            setTotalResult(questions.data.length);
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

    // console.log("'Chapter data : ", chapterData);

    return (

        <div className='container mt-4'>
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>

                <section className='col-md-9'>
                    <div className="card">
                        <h5 className='card-header'>All Questions ({totalResult}) <Link className='btn btn-success btn-sm float-end' to={`/add-quiz-question/${quiz_id}`}>Add Question</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (questionData.length > 0) && (
                                            questionData.map((question, index) => (
                                                <tr key={index}>
                                                    <td><Link to={`/edit-question/${question.id}`}>{question.question}</Link></td>
                                                    <td>
                                                        <Link to={`/edit-question/${question.id}`} className='btn btn-info btn-sm'> {<FaEdit color='white' size={20} />}</Link>
                                                        <button onClick={() => handleDeleteClick(question.id)} to={`/delete-question/${question.id}`} className='btn btn-danger btn-sm ms-2'>{<MdDeleteForever color='white' size={20} />}</button>
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
