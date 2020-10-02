import React, { useState, useEffect } from 'react';
import { server } from '../../setting.js';
import CourseCard from './CourseCard.js';
import 'materialize-css/dist/css/materialize.min.css'
import './courses.css';

function Courses(props) {
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        try {
            const response = fetch(`${server}/courses`);
            const courses = await (await response).json();
            console.log(courses);
            setCourses(courses);
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        const callCourses = async () => {
            await getCourses();
        }
        callCourses();
    }, []);

    return (
        <div className="container">
            <h3 className="courses-main">Explore All Courses</h3>
            {courses.length > 0 && courses.map((course, idx) => {
                return <CourseCard key={idx} course={course} />

            })}
        </div>
    )
}

export default Courses;