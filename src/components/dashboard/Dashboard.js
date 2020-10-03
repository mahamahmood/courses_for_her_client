import React, { useState, useEffect, useContext } from 'react';
import { server } from '../../setting.js';
import Layout from '../layout/Layout.js';
import { UserContext } from '../../context/ContextStore.js';

function Dashboard(props) {
    const [userState, dispatchUserState] = useContext(UserContext);
    // const [courses, updateCourses] = useState([]);
    // useEffect(() => {
    //     {
    //         if (userState.loggedIn) {
    //             (async () => {
    //                 try {
    //                     const response = await fetch(
    //                         `${server}/users/${userState.id}`
    //                     );
    //                     const data = await response.json();
    //                     updateCourses([...courses, ...data.courses]);
    //                 } catch (error) {
    //                     console.log(error);
    //                 }
    //             })();
    //         }
    //     }
    // }, [userState.loggedIn]);

    return (
        <>
        <Layout>
            <div>
                <h1>Dashboard</h1>
                <h2>{userState.username}</h2>
                {/* <div>
                    {courses.map((course) => {
                        return (
                            <div key={course.id}>
                                <img src={course.img} alt={course.title} />
                                <h4>Title: <small>{course.title}</small></h4>
                                <h4>Description: <small>{course.description}</small></h4>
                            </div>
                        )
                    })}
                </div> */}
            </div>
        </Layout>
        </>
    );
};

export default Dashboard;