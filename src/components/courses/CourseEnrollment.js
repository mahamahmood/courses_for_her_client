import React, { useState, useEffect } from 'react';
import { server } from '../../setting.js';
import axios from 'axios';

function CourseEnrollement(props) {
    return (
        <div>
            <button className="btn pink darken-2 waves-effect btn-large">Enroll</button>
        </div>
    )
};

export default CourseEnrollement;