import React, { useContext, useEffect, useState } from 'react';
import { server } from '../../setting.js';
import { UserContext } from '../../context/ContextStore.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function Layout(props) {
    const [userState, dispatchUserState] = useContext(UserContext);

    const handleLogOut = () => {
        userState.loggedIn = false
        localStorage.clear();
        props.history.push("/login");
    };

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (error) {
            return null;
        }
    };
    useEffect(() => {
        if (!localStorage.token) {
            userState.loggedIn = false
            return
        }
        const userIdentification = parseJwt(localStorage.token);
        (async () => {
            try {
                const response = await axios.get(`${server}/users/${userIdentification.id}`);
                dispatchUserState({ type: "SET_ID", payload: response.data.user.id });
                dispatchUserState({ type: "SET_FIRST_NAME", payload: response.data.user.first_name });
                dispatchUserState({ type: "SET_LAST_NAME", payload: response.data.user.last_name });
                dispatchUserState({ type: "SET_USERNAME", payload: response.data.user.username });
                dispatchUserState({ type: "SET_LOGGEDIN", payload: true });
            } catch (error) {
                console.log(error)
            }
        })()
    }, []);

    return (
        <div>
            <div>
                <div>
                    <a href='/'>Home</a>
                </div>
                <div>
                    <a href='/courses'>Courses</a>
                </div>
                <div>
                    <a href='/categories'>Categories</a>
                </div>
                {userState.loggedIn ?
                    <>
                        <div>
                            <a href='/dashboard'>Dashboard</a>
                        </div>
                    </> :
                    <>
                        <div>
                            <a href='/login'>Dashboard</a>
                        </div>
                    </>
                }
                {userState.loggedIn ?
                    <div>
                        <button onClick={handleLogOut}>Log Out</button>
                    </div> :
                    <div>
                        <button onClick={handleLogOut}>Log In</button>
                    </div>
                }
            </div>
            <div>
                {props.children}
            </div>
        </div>
    )
};

export default withRouter(Layout);