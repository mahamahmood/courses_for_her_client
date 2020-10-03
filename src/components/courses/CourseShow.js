import React, { useState, useEffect } from 'react';
import { server } from '../../setting.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CourseEnrollment from './CourseEnrollment.js';
import '../courses/courses.css';
import Layout from '../layout/Layout.js';

function CourseShow(props) {
    const [course, updateCourse] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const id = props.match.params.id;
                const response = await axios.get(`${server}/courses/${id}`);
                console.log(response);
                updateCourse({ ...response.data });
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <Layout>
            <div className="container">
                {Object.keys(course).length > 0 ? (
                    <div>
                        <div className="card">
                            <div className="card-image">
                                <Link className="pink darken-2 waves-effect btn" to={'/courses'}>Back to All Courses</Link>
                                <img style={{ height: 300, paddingLeft: 35, paddingRight: 35 }} src={course.img} alt={course.title} />
                            </div>
                            <div className="container-show card-content">
                                <h3>{course.title}</h3>
                                <span className="card-title grey-text text-darken-4"><strong>Category: </strong><i>{course.category.name}</i></span>
                                <h4>Course Description</h4>
                                <span className="card-title grey-text text-darken-4">{course.description}</span>
                                <h4>What will you learn</h4>
                                <span className="card-title grey-text text-darken-4">{course.what_will_you_learn}</span>
                                <h4>Course Instructor:</h4>
                                <span className="card-title grey-text text-darken-4"><strong>Name: </strong>{course.instructor.name}</span>
                                <span className="card-title grey-text text-darken-4"><strong>Title: </strong>{course.instructor.title}</span>
                                <span className="card-title grey-text text-darken-4"><strong>LinkedIn: </strong>{course.instructor.linkedin}</span>
                                <span className="card-title grey-text text-darken-4"><strong>Email: </strong>{course.instructor.email}</span>
                                <span className="card-title grey-text text-darken-4"><strong>Bio: </strong>{course.instructor.bio}</span>
                                <br />
                                <div>
                                    <CourseEnrollment course={course} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                        <div></div>
                    )}
            </div>
        </Layout>
    )

};

export default CourseShow;