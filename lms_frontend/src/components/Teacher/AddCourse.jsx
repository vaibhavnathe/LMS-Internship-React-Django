import React, { useEffect, useState } from 'react'
import TeacherSidebar from './TeacherSidebar'
import { Link } from 'react-router-dom'
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function AddCourse() {

    const teacherId = localStorage.getItem('teacherId');

    const [categories, setCategories] = useState([]);
    const [courseData, setCourseData] = useState({
        category:'',
        title:'',
        description:'',
        f_img:'',
        techs:''
    });

    useEffect(() => {
        const fetchCategories = async() => {
            try{
                let response = await axios.get(baseUrl + '/category')
                if(response){
                    setCategories(response.data);
                    console.log(response.data);
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fetchCategories();
    },[])

    const handleChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name] : event.target.value
        })
    }

    const handleFileChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name] : event.target.files[0]
        })
    }

    const formSubmit = async(event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData();
        formData.append('category', courseData.category);
        formData.append('teacher', teacherId);
        formData.append('title', courseData.title);
        formData.append('description', courseData.description);
        formData.append('featured_img', courseData.f_img, courseData.f_img.name);
        formData.append('techs', courseData.techs);

        try{
            const response = await axios.post(baseUrl + '/course/',formData,{
                headers:{
                    'content-type' : 'multipart/form-data'
                }
            })

            window.location.href = '/add-course';
            
            console.log(response.data);
        }
        catch(error){
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
                        <h5 className="card-header">Add Course</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-sm-2 label">Category</label>
                                    <select id="category-select" name="category" value={courseData.category.title} onChange={handleChange} className='form-control'>
                                        {/* Map through categories to create option elements */}
                                        {categories && categories.map((category, index) => (
                                            <option key={index} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input onChange={handleChange} value={courseData.title} type="text" name='title' className="form-control" id="title" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea onChange={handleChange} type="text" value={courseData.description} name='description' className="form-control" id="description" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="video" className="form-label">Featured Image</label>
                                    <input onChange={handleFileChange} type="file" name='f_img' className="form-control" id="video" />

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="techs" className="form-label">Technologies</label>
                                    <textarea onChange={handleChange} type="text" value={courseData.techs} name='techs' placeholder='Php, Python, Javascript, C++ , etc.' className="form-control" id="techs" />
                                </div>

                                <div className='mt-3'>
                                    <button onClick={formSubmit} className='btn btn-primary' type='submit'>Submit</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </section>
            </div>
        </div>

    )
}
