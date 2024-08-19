import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';


export const CourseChapters = () => {

    const { course_id } = useParams();
    // console.log("COURSEID : ", course_id);

    const [chapterData, setChapterData] = useState([]);
    const [totalResult, setTotalResult] = useState(0);

    // Fetching the chapter data
    useEffect(() => {
        const getAllChapters = async () => {

            try {
                const chapters = await axios.get(baseUrl + `/course-chapters/${course_id}`);
                if (chapters) {

                    setChapterData(chapters.data);
                    setTotalResult(chapters.data.length);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getAllChapters();

    }, [])

    // Delete chapter data
    const handleDeleteClick = () => {
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this data',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton : true
        });
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
                        <h5 className='card-header'>All Chapters ({totalResult})</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Video</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (chapterData.length > 0) && (
                                            chapterData.map((chapter, index) => (
                                                <tr key={index}>
                                                    <td><Link to={`/edit-chapter/${chapter.id}`}>{chapter.title}</Link></td>
                                                    <td>
                                                        <video controls width={200} height={200} />
                                                        <source src={chapter.video} type='video/webm' />
                                                    </td>
                                                    <td>{chapter.remarks}</td>
                                                    <td>
                                                        <Link to={`/edit-chapter/${chapter.id}`} className='btn btn-info btn-sm'> {<FaEdit color='white' size={20} />}</Link>
                                                        <button onClick={handleDeleteClick} to={`/delete-chapter/${chapter.id}`} className='btn btn-danger btn-sm ms-2'>{<MdDeleteForever color='white' size={20} />}</button>
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
