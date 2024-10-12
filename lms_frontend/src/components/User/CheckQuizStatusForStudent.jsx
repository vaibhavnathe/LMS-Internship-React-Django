import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';


const baseUrl = 'http://127.0.0.1:8000/api';

export default function CheckQuizStatusForStudent(props) {

    const studentId = localStorage.getItem('studentId');

    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        const getAllQuizes = async () => {

            try {
                const quizes = await axios.get(baseUrl + `/fetch-quiz-attempt-status/${props.quiz}/${props.student}`);
                if (quizes) {
                    setQuizData(quizes.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getAllQuizes();

    }, [])

    return (


        <td>
            {
                quizData.bool == true &&
                <span className='text-success'>Attempted</span>
            }
            {
                quizData.bool == false &&
                
                <Link to={`/take-quiz/${props.quiz}`} className='btn btn-success btn-md ms-2'>Take Quiz</Link>
            }
        </td>


    )
}
