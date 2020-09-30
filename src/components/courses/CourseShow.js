import React, { useState, useEffect } from 'react';
import { server } from '../../setting.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CourseEnrollment from './CourseEnrollment.js';

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
        <div>
            {Object.keys(course).length > 0 ? (
                <div>
                    <Link to={'/courses'}>Back to All Courses</Link>
                    <div>
                        <h2>Title: {course.title}</h2>
                        <img src={course.img} alt={course.title} />
                        <h3>Course Category:</h3>
                        <p>{course.category.name}</p>
                        <h3>Course description:</h3>
                        <p>{course.description}</p>
                        <h3>What will you learn:</h3>
                        <p>{course.what_will_you_learn}</p>
                        <h3>Course Instructor:</h3>
                        <p>Name: {course.instructor.name}</p>
                        <p>Title: {course.instructor.title}</p>
                        <p>LinkedIn: {course.instructor.linkedin}</p>
                        <p>Email: {course.instructor.email}</p>
                        <p>Bio: {course.instructor.bio}</p>
                        <CourseEnrollment course={course} />
                    </div>
                </div>
            ) : (
                    <div></div>
                )}
        </div>
    )

};

export default CourseShow;