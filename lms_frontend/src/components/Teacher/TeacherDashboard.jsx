import React from 'react' 
import TeacherSidebar from './TeacherSidebar'

export default function TeacherDashboard() {
    
    return (
        <div className='container mt-4'>
            
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar/>
                </aside>
                <section className='col-md-9'>
                  Teacher Dashboard
                </section>
            </div>
        </div>
    )
}
