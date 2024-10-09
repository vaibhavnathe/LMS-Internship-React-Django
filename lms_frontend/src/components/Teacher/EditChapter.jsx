import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const baseUrl = 'http://127.0.0.1:8000/api';

export const EditChapter = () => {

    const { chapter_id } = useParams();

    const [chapterData, setChapterData] = useState({
        course: '',
        title: '',
        description: '',
        prev_video: '',
        video: '',
        remarks: ''
    });

    const handleChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.value
        })
    }

    const handleFileChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.files[0]
        })
    }

    const formSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData();
        formData.append('course', chapterData.course.id);
        formData.append('title', chapterData.title);
        formData.append('description', chapterData.description);
        if (chapterData.video !== '') {
            formData.append('video', chapterData.video, chapterData.video.name);
        }
        formData.append('remarks', chapterData.remarks);

        try {
            const response = await axios.put(baseUrl + '/chapter/' + chapter_id, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })

            if (response.status == 200) {
                Swal.fire({
                    title: 'Data has been updated',
                    icon: 'success', // Fixed typo here
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }

            window.location.href = '/all-chapters/'+chapterData.course.id;

            console.log(response);
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while updating the chapter.',
                icon: 'error',
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
              });
        }

    }

    // fetch chapter data when page load
    useEffect(() => {
        const getAllChapters = async () => {

            try {
                const chapters = await axios.get(baseUrl + `/chapter/${chapter_id}`);
                if (chapters) {
                    // console.log(chapters.data);
                    setChapterData({
                        course: chapters.data.course,
                        title: chapters.data.title,
                        description: chapters.data.description,
                        prev_video: chapters.data.video,
                        video: '',
                        remarks: chapters.data.remarks
                    });

                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getAllChapters();

    }, [])

    return (
        <div className='container mt-4'>
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className="card">
                        <h5 className="card-header">Update Chapter</h5>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input onChange={handleChange} value={chapterData.title} type="text" name='title' className="form-control" id="title" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea onChange={handleChange} value={chapterData.description} type="text" name='description' className="form-control" id="description" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="video" className="form-label">Video</label>
                                <input onChange={handleFileChange} type="file" name='video' className="form-control" id="video" />
                                {
                                    chapterData.prev_video &&
                                    <video controls width="100%" height="240" className='mt-2'>
                                        <source src={chapterData.prev_video} type="video/mp4" />

                                    </video>
                                }


                            </div>

                            <div className="mb-3">
                                <label htmlFor="remarks" className="form-label">Remarks</label>
                                <textarea onChange={handleChange} value={chapterData.remarks} type="text" name='remarks' placeholder='Php, Python, Javascript, C++ , etc.' className="form-control" id="techs" />
                            </div>

                            <div className='mt-3'>
                                <button className='btn btn-primary' onClick={formSubmit} type='button'>Submit</button>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    )
}
