import React, { useContext, useEffect, useState } from 'react';
import { server } from '../../setting.js';
import { UserContext } from '../../context/ContextStore.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import '../main.css';
import jwt_decode from 'jwt-decode';


function Layout(props) {
    const [userState, dispatchUserState] = useContext(UserContext);
    
    const handleLogOut = () => {
        userState.isLoggedIn = false
        localStorage.clear();
        props.history.push("/login");
    };

    const decodedToken = (token) => {
		return jwt_decode(token);
    };

    useEffect(() => {
        if (localStorage.token) {
            userState.isLoggedIn = true
        }else{
            userState.isLoggedIn = false
        }
        (async () => {
            try {
                const idx = decodedToken(localStorage.token).user.id
                console.log(idx)
                console.log(localStorage.token)
                const response = await axios.get(`${server}/users/${idx}`);
                console.log(response);
                dispatchUserState({ type: "SET_ID", payload: response.data.id });
                dispatchUserState({ type: "SET_FIRST_NAME", payload: response.data.first_name });
                dispatchUserState({ type: "SET_LAST_NAME", payload: response.data.last_name });
                dispatchUserState({ type: "SET_USERNAME", payload: response.data.username });
                dispatchUserState({ type: "SET_ISLOGGEDIN", payload: true });
                console.log(userState)
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
                {userState.isLoggedIn ?
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
                {userState.isLoggedIn ?
                    <div>
                        <button className="btn pink darken-2 waves-effect btn-medium" onClick={handleLogOut}>Log Out</button>
                    </div> :
                    <div>
                        <button className="btn pink darken-2 waves-effect btn-medium" onClick={handleLogOut}>Log In</button>
                    </div>
                }
            </div>
            <div>
                {props.children}
            </div>
            <Footer />
        </div>
    )
};

export default withRouter(Layout);