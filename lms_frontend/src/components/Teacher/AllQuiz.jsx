import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function AllQuiz() {

    const teacherId = localStorage.getItem('teacherId');

    const [quizData, setQuizData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);

    useEffect(() => {
        const getAllCourse = async () => {

            try {
                const quizes = await axios.get(baseUrl + `/teacher-quiz/${teacherId}`);
                if (quizes) {
                    // console.log("Data : ", quizes);
                    setQuizData(quizes.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getAllCourse();

    }, [])

    // Delete chapter data
    const handleDeleteClick = async (quiz_id) => {
        const result = await Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this data',
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
                            setTotalResult(quizes.data.length);
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
                        <h5 className='card-header'>All Quiz</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Total Quetions</th>
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
                                                    <td><Link to={`#`}> 123 </Link></td>
                                                    <td>
                                                       
                                                        <Link to={`/edit-quiz/${quiz.id}`}><button className='btn btn-info btn-md  '>Edit</button></Link>
                                                        <Link to={`/add-quiz-question/${quiz.id}`}><button className='btn btn-success btn-md  ms-2 '>Add Quetion</button></Link>
                                                        <button onClick={() => handleDeleteClick(quiz.id)} className='btn btn-danger btn-md ms-2'>Delete</button>

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
