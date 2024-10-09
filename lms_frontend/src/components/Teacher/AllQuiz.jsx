import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function AllQuiz() {

    const teacherId = localStorage.getItem('teacherId');

    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        const getAllCourse = async () => {

            try {
                const quizes = await axios.get(baseUrl + `/teacher-quiz/${teacherId}`);
                if (quizes) {
                    console.log("Data : ", quizes);
                    setQuizData(quizes.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getAllCourse();

    }, [])


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
                                                        <Link to={`/all-quetions/${quiz.id}`}>{quiz.title}</Link>
                                                       
                                                    </td>
                                                    <td><Link to={`#`}> 123 </Link></td>
                                                    <td>
                                                       
                                                        <Link to='#'><button className='btn btn-info btn-md  '>Edit</button></Link>
                                                        <Link to={`/add-quiz-quetion/${quiz.id}`}><button className='btn btn-success btn-md  ms-2 '>Add Quetion</button></Link>
                                                        <button className='btn btn-danger btn-md ms-2'>Delete</button>

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
