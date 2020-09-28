import React, { useState, useEffect } from 'react';

function Courses(props) {
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        try {
            const response = fetch('/courses')
            const courses = await (await response).json();
            console.log(courses);
            setCourses(courses);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const callCourses = async () => {
            await getCourses();
        }
        callCourses();
    }, []);

    return (
        <>
            <h2>List Of All Courses</h2>
            {courses.map(course => {
                return (
                    <div className="courses" key={course.id}>
                        <img src={course.img} alt={course.title} />
                        <h4>Title: <small>{course.title}</small></h4>
                        <h4>Description: <small>{course.description}</small></h4>
                        <h4>Category: <small>{course.category.name}</small></h4>
                        <h4>Instructor Name: <small>{course.instructor.name}</small></h4>
                        <br />
                    </div>
                )
            })}
        </>
    )
}

export default Courses;