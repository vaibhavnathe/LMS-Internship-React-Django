import Sidebar from './Sidebar'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import CheckQuizStatusForStudent from './CheckQuizStatusForStudent';

const baseUrl = 'http://127.0.0.1:8000/api';


export default function CourseQuizList() {

    const studentId = localStorage.getItem('studentId');
    const { course_id } = useParams();

    const [quizData, setQuizData] = useState([]);

    // Fetch all the courses
    useEffect(() => {
        const fetchAllQuizes = async () => {

            try {
                const res = await axios.get(baseUrl + `/fetch-assigned-quiz/${course_id}`);
                if (res) {
                    // console.log("data : ", courses);
                    setQuizData(res.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchAllQuizes();

        document.title = "Quiz List";

    }, [])

    return (

        <div className='container mt-4'>
            <div className="row">
                <aside className='col-md-3'>
                    <Sidebar />
                </aside>
                <section className='col-md-9'>
                    <div className="card">
                        <h5 className='card-header'>Quiz List</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Quiz</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        quizData.length > 0 &&
                                        quizData.map((data, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {data.quiz.title}
                                                </td>
                                                <CheckQuizStatusForStudent quiz={data.quiz.id} student={studentId}/>
                                            </tr>
                                        ))
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
