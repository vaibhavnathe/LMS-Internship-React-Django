import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const baseUrl = 'http://127.0.0.1:8000/api';

export default function CheckQuizInCourse(props) {

    const teacherId = localStorage.getItem('teacherId');
    const { course_id } = useParams();

    const [quizData, setQuizData] = useState([]);
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        const getAllQuizes = async () => {

            try {
                const quizes = await axios.get(baseUrl + `/fetch-quiz-assign-status/${props.quiz}/${props.course}`);
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

    //AssignQuiz Handler
    const assignQuiz = async (quiz_id) => {

        const formData = new FormData();
        formData.append('teacher', teacherId);
        formData.append('course', props.course);
        formData.append('quiz', props.quiz);

        try {
            const response = await axios.post(baseUrl + '/quiz-assign-course/', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (response.status == 200 || response.status == 201) {
                toast.success("Quiz is Successfully assigned in the Course");
                window.location.reload();
            }

        }
        catch (error) {
            toast.error("Something Went Wrong!");
            console.log(error);
        }
    }

    return (

    
            <td>
                {
                   quizData.bool == false &&
                    <button onClick={() => assignQuiz(props.quiz)} className='btn btn-success btn-md ms-2'>Assign Quiz</button>
                }
                {
                    quizData.bool == true &&
                    <span className='text-success'>Assigned</span>
                }
            </td>


    )
}
