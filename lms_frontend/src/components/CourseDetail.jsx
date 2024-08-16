import React from 'react'
import { useParams, Link } from 'react-router-dom'
import logo from '../assests/logo.jpeg'

export default function CourseDetail() {

    const { course_id } = useParams();

    return (
        <div className="container mt-3">

            <div className="row">
                <div className="col-4">
                    <img src={logo} className="img-thumbnail    " alt="Course Image" />
                </div>
                <div className="col-8">
                    <h3>Course title</h3>
                    <p>Using a combination of grid and utility classes, cards can be made horizontal in a mobile-friendly and responsive way. In the example below, we remove the grid gutters with .g-0 and use .col-md-* classes to make the card horizontal at the md breakpoint. Further adjustments may be needed depending on your card content.</p>
                    <p className='fw-bold'>Course By: <Link to='/teacher-detail/1'>Teacher 1</Link></p>
                    <p className='fw-bold'>Duration: 3 Hours 30 Minutes</p>
                    <p className='fw-bold'>Total Enrolled: 456 Students</p>
                    <p className='fw-bold'>Rating: 4.5/5</p>
                </div>
            </div>

            {/* Course Videos*/}
            <div className="card mt-4">
                <h5 className="card-header">
                    Course Videos
                </h5>
                <ul className="list-group list-group-flush">

                    <li className="list-group-item">
                        Introduction
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
                                            <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowFullScreen></iframe>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> 


                    </li>
                    <li className="list-group-item">
                        Introduction
                        <span className='float-end'>
                            <span className='me-5'>1 Hour 30 Minutes</span>
                            <button className="btn btn-sm btn-danger float-end"><i className="bi bi-youtube"></i></button>
                        </span>
                    </li>
                    <li className="list-group-item">
                        Introduction
                        <span className='float-end'>
                            <span className='me-5'>1 Hour 30 Minutes</span>
                            <button className="btn btn-sm btn-danger float-end"><i className="bi bi-youtube"></i></button>
                        </span>
                    </li>
                    <li className="list-group-item">
                        Introduction
                        <span className='float-end'>
                            <span className='me-5'>1 Hour 30 Minutes</span>
                            <button className="btn btn-sm btn-danger float-end"><i className="bi bi-youtube"></i></button>
                        </span>
                    </li>
                    <li className="list-group-item">
                        Introduction
                        <span className='float-end'>
                            <span className='me-5'>1 Hour 30 Minutes</span>
                            <button className="btn btn-sm btn-danger float-end"><i className="bi bi-youtube"></i></button>
                        </span>
                    </li>
                </ul>
            </div>

            <h3 className=' pb-1 mb-4 mt-4'>
                Related Courses
            </h3>
            <div className='row'>
                <div className='col-md-3'>
                    <div className="card" >
                        <Link to='/detail/1'>
                            <img src={logo} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">
                                    Course title
                                </h5>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className='col-md-3'>
                    <div className="card" >
                        <a href="#"><img src={logo} className="card-img-top" alt="..." /></a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#">Course title</a>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
