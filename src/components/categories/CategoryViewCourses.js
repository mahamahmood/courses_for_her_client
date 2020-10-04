import React, { useState, useEffect } from 'react';
import { server } from '../../setting.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './category.css';
import Layout from '../layout/Layout.js';

function CategoryViewCourses(props) {
    const [category, updateCategory] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const id = props.match.params.id;
                const response = await axios.get(`${server}/categories/${id}`);
                console.log(response);
                updateCategory({ ...response.data });
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <Layout>
            <Link className="backTo pink darken-2 waves-effect btn" to={'/categories'}>Back to All Categories</Link>
            <div className="container">
                <h3 className="cateogry-main">Category: {category.name}</h3>
                {Object.keys(category).length > 0 ? (
                    <div>
                        {category.courses.map((course) => {
                            return (
                                <div className="CourseCard">
                                    <div className="card large" key={course.id}>
                                        <div className="card-image">
                                            <img src={course.img} alt={course.title} />
                                        </div>
                                        <div className="card-content">
                                            <span className="card-title grey-text text-darken-4"><strong>Title: </strong>{course.title}</span>
                                        </div>
                                        <div>
                                            <Link className="btn pink darken-2 waves-effect btn-large" style={{ textDecoration: 'none' }} from={'*'} to={`/courses/${course.id}`}>
                                                <div key={course.id}>View Course</div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                        <div></div>
                    )}
            </div>
        </Layout>
    )

};

export default CategoryViewCourses;