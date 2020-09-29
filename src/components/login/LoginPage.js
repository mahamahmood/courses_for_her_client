import React, { useContext, useState } from 'react';
import { server } from '../../setting.js';
import { UserContext } from '../../context/ContextStore.js';
import axios from 'axios';

function Login(props) {
    // const [userState, dispatchUserState] = useContext(UserContext);

    // === login ===
    const [loginInfo, updateLoginInfo] = useState({
        username: '',
        password: ''
    });
    const handleLoginChange = (event) => {
        updateLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    };
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${server}/users/login`, {
                username: loginInfo.username,
                password: loginInfo.password
            });
            localStorage.token = response.data.token;
            console.log(response);
            props.history.push('/courses')
        } catch (error) {
            console.error(error)
        }
    };

    // === signup ====
    const [signupInfo, updateSignupInfo] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });
    const handleSignupChange = (event) => {
        updateSignupInfo({ ...signupInfo, [event.target.name]: event.target.value });
    };
    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${server}/users/signup`, {
                firstName: signupInfo.firstName,
                lastName: signupInfo.lastName,
                username: signupInfo.username,
                password: signupInfo.password
            });
            localStorage.token = response.data.token;
            console.log(response);
            // props.history.push('/dashboard');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div>
                <h2>Log In</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div>
                        <label htmlFor='loginUsername'>Username</label><br />
                        <input type='text' name='username' id='loginUsername' value={loginInfo.username} onChange={handleLoginChange} /><br />
                    </div>
                    <div>
                        <label htmlFor='loginPassword'>Password</label><br />
                        <input type='password' name='password' id='loginPassword' value={loginInfo.password} onChange={handleLoginChange} /><br />
                    </div>
                    <input type='submit' />
                </form>
            </div>
            <div className='or'>
                {/* make a border separator */}
            </div>
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={handleSignupSubmit}>
                    <div>
                        <label htmlFor='signupFirstName'>First Name</label><br />
                        <input type='text' name='firstName' id='signupFirstName' value={signupInfo.firstName} onChange={handleSignupChange} /><br />
                    </div>
                    <div>
                        <label htmlFor='signupLastName'>Last Name</label><br />
                        <input type='text' name='lastName' id='signupLastName' value={signupInfo.lastName} onChange={handleSignupChange} /><br />
                    </div>
                    <div>
                        <label htmlFor='signupUsername'>Username</label><br />
                        <input type='text' name='username' id='signupUsername' value={signupInfo.username} onChange={handleSignupChange} /><br />
                    </div>
                    <div>
                        <label htmlFor='signupPassword'>Password</label><br />
                        <input type='password' name='password' id='signupPassword' value={signupInfo.password} onChange={handleSignupChange} /><br />
                    </div>
                    <input type='submit' />
                </form>
            </div>
        </div>
    )
};

export default Login;