import React, { useState, useEffect } from 'react';
import { server } from '../../setting.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        <div>
            {Object.keys(category).length > 0 ? (
                <div>
                    <Link to={'/categories'}>Back to All Categories</Link>
                    <div>
                        {category.courses.map((course) => {
                            return (
                                <div>
                                    <div key={course.id}>
                                        <img src={course.img} alt={course.title} />
                                        <h4>Title: <small>{course.title}</small></h4>
                                        <h4>Description: <small>{course.description}</small></h4>
                                        {/* <h4>Category: <small>{course.category.name}</small></h4> */}
                                        <br />
                                        {/* <h3>Course Instructor:</h3> */}
                                        {/* <p>Name: {course.instructor.name}</p> */}
                                        {/* <p>Title: {course.instructor.title}</p>
                                    <p>LinkedIn: {course.instructor.linkedin}</p>
                                    <p>Email: {course.instructor.email}</p>
                                    <p>Bio: {course.instructor.bio}</p> */}
                                        {/* <CourseEnrollment course={course} /> */}
                                        <Link style={{ textDecoration: 'none' }} to={`/courses/${course.id}`}>View course</Link>
                                    </div>
                                    {/* <div>
                                        <Link style={{ textDecoration: 'none' }} from={'*'} to={`/categories/${category.id}/${course.id}`}>
                                            <div key={course.id}>View Course</div>
                                        </Link>
                                    </div> */}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : (
                    <div></div>
                )}
        </div>
    )

};

export default CategoryViewCourses;