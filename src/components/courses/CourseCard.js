import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard(props) {
    const course = props.course;

    return (
        <div className="CourseCard">
            <div className="card large" key={course.id}>
                <div className="card-image">
                    <img src={course.img} alt={course.title} />
                </div>
                <div className="card-content">
                    <span className="card-title grey-text text-darken-4"><strong>Title: </strong>{course.title}</span>
                    <span className="card-title  grey-text text-darken-4"><strong>Category:</strong> {course.category.name}</span>
                </div>
                <div>
                <Link className="btn pink darken-2 waves-effect btn-large" style={{ textDecoration: 'none' }} from={'*'} to={`/courses/${course.id}`}>
                    <div key={course.id}>View Course</div>
                </Link>
            </div>
            </div>
            
        </div>
    )
};

export default CourseCard;