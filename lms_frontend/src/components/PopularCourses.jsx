import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assests/logo.jpeg'
import devops from '../assests/devops.png'
import django from '../assests/django.jpeg'
import python from '../assests/python.webp'

export const PopularCourses = () => {
    return (
        <div className='container mt-4'>
            <h3 className=' pb-1 mb-4'>
                Popular Courses
            </h3>
            <div className='row'>
                <div className='col-md-3  mb-4'>
                    <div className="card" >
                        <Link to='/detail/1'> <img src={devops} className="card-img-top" alt="..." /></Link>
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to='/detail/1'>Course title</Link>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                                <span className='float-end'>Views: 78965</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='col-md-3 mb-4'>
                    <div className="card" >
                        <a href="#"><img src={python} className="card-img-top" alt="..." /></a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#">Course title</a>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                                <span className='float-end'>Views: 78965</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-3 mb-4'>
                    <div className="card" >
                        <a href="#"><img src={django} className="card-img-top" alt="..." /></a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#">Course title</a>
                            </h5>

                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                                <span className='float-end'>Views: 78965</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-3 mb-4'>
                    <div className="card" >
                        <a href="#"><img src={logo} className="card-img-top" alt="..." /></a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#">Course title</a>
                            </h5>

                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                                <span className='float-end'>Views: 78965</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 mb-4'>
                    <div className="card" >
                        <Link to='/detail/1'> <img src={logo} className="card-img-top" alt="..." /></Link>
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to='/detail/1'>Course title</Link>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                                <span className='float-end'>Views: 78965</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 mb-4'>
                    <div className="card" >
                        <Link to='/detail/1'> <img src={django} className="card-img-top" alt="..." /></Link>
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to='/detail/1'>Course title</Link>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                                <span className='float-end'>Views: 78965</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 mb-4'>
                    <div className="card" >
                        <Link to='/detail/1'> <img src={python} className="card-img-top" alt="..." /></Link>
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to='/detail/1'>Course title</Link>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                                <span className='float-end'>Views: 78965</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 mb-4'>
                    <div className="card" >
                        <Link to='/detail/1'> <img src={devops} className="card-img-top" alt="..." /></Link>
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to='/detail/1'>Course title</Link>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>Rating: 4.5/5</span>
                                <span className='float-end'>Views: 78965</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination Start */}
            <nav aria-label="Page navigation example mt-5">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    )
}
