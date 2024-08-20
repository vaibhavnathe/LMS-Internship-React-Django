import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import logo from '../assests/logo.jpeg'
import axios from 'axios';
import ReactPlayer from 'react-player';


const baseUrl = 'http://127.0.0.1:8000/api';
const siteUrl = 'http://127.0.0.1:8000/';

export default function CourseDetail() {

    const { course_id } = useParams();

    const [courseData, setCourseData] = useState(null);
    const [chapterData, setChapterData] = useState([]);
    const [relatedCourseData, setRelatedCourseData] = useState([]);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/course/${course_id}`);
                if (response.data) {
                    // console.log("CourseData: ", response.data.course_chapters);
                    setCourseData(response.data);
                    setChapterData(response.data.course_chapters);
                    setRelatedCourseData(JSON.parse(response.data.related_videos));
                }
            }
            catch (error) {
                console.log("Error While Fetching Course Detail!");
                console.log(error);
            }
        }
        fetchCourseData();
    }, [])

    // console.log(courseData);
    // console.log(chapterData);
    // console.log(relatedCourseData);

    if (!courseData) {
        return <div>Loading...</div>;
    }


    return (
        <div className="container mt-3">

            <div className="row">
                <div className="col-4">
                    <img src={courseData.featured_img} className="img-thumbnail    " alt={courseData.title} />
                </div>
                <div className="col-8">
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <p className='fw-bold'>Course By: <Link to='/teacher-detail/1'>{courseData.teacher.full_name}</Link></p>
                    <p className='fw-bold'>Duration: 3 Hours 30 Minutes</p>
                    <p className='fw-bold'>Total Enrolled: 456 Students</p>
                    <p className='fw-bold'>Rating: 4.5/5</p>
                </div>
            </div>

            {/* Course Videos*/}
            <div className="card mt-4">
                <h5 className="card-header">
                    In this course
                </h5>
                <ul className="list-group list-group-flush">
                    {
                        (chapterData.length > 0) && (
                            chapterData.map((chapter, index) => (

                                <li className="list-group-item" key={index}>
                                    {chapter.title}

                                    <span className='float-end'>
                                        <span className='me-5'>1 Hour 30 Minutes</span>
                                        <button className="btn btn-sm btn-danger float-end" data-bs-toggle="modal" data-bs-target="#videoModal1"><i className="bi bi-youtube"></i></button>
                                    </span>

                                    {/* <!-- Video Modal  --> */}
                                    <div className="modal fade" id="videoModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-xl">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Video 1</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="ratio ratio-16x9">
                                                        {chapter.video ? (
                                                            // <iframe
                                                            //     src={chapter.video}
                                                            //     title={chapter.title}
                                                            //     allowFullScreen
                                                            // ></iframe>
                                                            <div>
                                                                 <ReactPlayer url={chapter.video} controls={true} width="100%" height="100%" />
                                                                {/* <video controls width="100%" height="auto"/>
                                                                <source src={chapter.video} type='video/mp4' /> */}
                                                            </div>
                                                        ) : (
                                                            <p>No video available</p>
                                                            // 
                                                        )}

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                </li>
                            ))
                        )
                    }


                </ul>
            </div>

            <h3 className=' pb-1 mb-4 mt-4'>
                Related Courses
            </h3>
            <div className='row mb-4'>
                {
                    relatedCourseData.length > 0 && (
                        relatedCourseData.map((rcourse, index) => (
                            <div className='col-md-3' key={index}>
                                <div className="card" style={{ width: '300px', height: '250px' }}>
                                    <Link target='__blank' to={`/detail/${rcourse.pk}`}>
                                        
                                        <img src={`${siteUrl}/media/${rcourse.fields.featured_img}`} className="card-img-top" alt={rcourse.fields.title}/>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {rcourse.fields.title}
                                            </h5>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )
                }


            </div>

        </div>
    )
}
