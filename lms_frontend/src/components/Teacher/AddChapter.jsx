import React from 'react'
import TeacherSidebar from './TeacherSidebar'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';

export const AddChapter = () => {

    const [chapterData, setChapterData] = useState({
        title: '',
        description: '',
        video: '',
        remarks: ''
    });

    const {course_id} = useParams();

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
        formData.append('course',course_id);
        formData.append('title', chapterData.title);
        formData.append('description', chapterData.description);
        formData.append('video', chapterData.video, chapterData.video.name);
        formData.append('remarks', chapterData.remarks);

        try {
            const response = await axios.post(baseUrl + '/chapter/', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })

            window.location.href = '/all-chapters/'+course_id;

            console.log(response.data);
        }
        catch (error) {
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
                        <h5 className="card-header">Add Chapter</h5>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input onChange={handleChange}  type="text" name='title' className="form-control" id="title" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea onChange={handleChange} type="text"  name='description' className="form-control" id="description" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="video" className="form-label">Video</label>
                                <input onChange={handleFileChange} type="file" name='video' className="form-control" id="video" />

                            </div>

                            <div className="mb-3">
                                <label htmlFor="remarks" className="form-label">Remarks</label>
                                <textarea onChange={handleChange} type="text" name='remarks' placeholder='Php, Python, Javascript, C++ , etc.' className="form-control" id="techs" />
                            </div>

                            <div className='mt-3'>
                                <button className='btn btn-primary' onClick={formSubmit}  type='button'>Submit</button>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    )
}
