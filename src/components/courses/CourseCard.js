import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard(props) {
    const course = props.course;

    return (
        <div>
            <div className="courses" key={course.id}>
                <img src={course.img} alt={course.title} />
                <h4>Title: <small>{course.title}</small></h4>
                <h4>Description: <small>{course.description}</small></h4>
                <h4>Category: <small>{course.category.name}</small></h4>
                <br />
            </div>
            <div>
                <Link style={{ textDecoration: 'none' }} from={'*'} to={`/courses/${course.id}`}>
                    <div key={course.id}>View Course</div>
                </Link>
            </div>
        </div>
    )
};

export default CourseCard;