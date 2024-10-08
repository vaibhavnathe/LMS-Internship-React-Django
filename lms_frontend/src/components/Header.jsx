import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <div className="container">

                    <Link to='/' className="navbar-brand">
                        Learn Online
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                            <Link className="nav-link" to='/all-courses'>Courses</Link>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Teacher
                                </a>
                                <ul className="dropdown-menu">
                                    {!teacherLoginStatus &&
                                        <>
                                            <li><Link className="dropdown-item" to='/teacher-login'>Login</Link></li>
                                            <li><Link className="dropdown-item" to='/teacher-register'>Register</Link></li>
                                        </>
                                    }

                                    {
                                        teacherLoginStatus &&
                                        <>
                                            <li><Link className="dropdown-item" to='/teacher-dashboard'>Dashboard</Link></li>
                                            <li><Link className="dropdown-item" to='/teacher-logout'>Log Out</Link></li>
                                        </>
                                    }


                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    User
                                </a>
                                <ul className="dropdown-menu">
                                    {
                                        studentLoginStatus ?
                                            (
                                                <>
                                                    <li><Link className="dropdown-item" to='user-dashboard'>Dashboard</Link></li>
                                                    <li><Link className="dropdown-item" to='user-logout'>Log Out</Link></li>
                                                </>
                                            ) :
                                            (
                                                <>
                                                    <li><Link className="dropdown-item" to='user-login'>Login</Link></li>
                                                    <li><Link className="dropdown-item" to='user-register'>Register</Link></li>
                                                </>
                                            )
                                    }


                                </ul>
                            </li>



                        </div>
                    </div>

                </div>
            </nav>
        </div>
    )
}
