import React, { useContext, useEffect, useState } from 'react';
import { server } from '../../setting.js';
import { UserContext } from '../../context/ContextStore.js';
import axios from 'axios';
import '../../App.css';
import Layout from '../layout/Layout.js';

function Login(props) {
    const [userState, dispatchUserState] = useContext(UserContext);
    // const [loggedIn, updateLogdedIn] = useState(false)
    // ==== login ==== //
    const [loginInfo, updateLoginInfo] = useState({
        username: '',
        password: '',
    });

    const handleLoginChange = (event) => {
        updateLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    };
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${server}/users/login`,
                {
                    user: {
                        username: loginInfo.username,
                        password: loginInfo.password,
                    }
                });
            localStorage.token = response.data.token;
            // console.log(localStorage)
            props.history.push('/dashboard');
        } catch (error) {
            console.error(error)
        }
    };

    // === signup ==== //
    const [signupInfo, updateSignupInfo] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
    });

    const handleSignupChange = (event) => {
        updateSignupInfo({ ...signupInfo, [event.target.name]: event.target.value });
    };
    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${server}/users`,
                {
                    user: {
                        first_name: signupInfo.first_name,
                        last_name: signupInfo.last_name,
                        username: signupInfo.username,
                        password: signupInfo.password,
                    }
                });
            localStorage.token = response.data.token;
            console.log(response, userState);
            props.history.push('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    // ==== return ==== //
    return (
        <div className="App">
            <Layout>
                <div>
                    <h2>Log In</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div>
                            <label htmlFor='loginUsername'>Username</label><br />
                            <input
                                type='text'
                                name='username'
                                id='loginUsername'
                                value={loginInfo.username}
                                onChange={handleLoginChange} /><br />
                        </div>
                        <div>
                            <label htmlFor='loginPassword'>Password</label><br />
                            <input
                                type='password'
                                name='password'
                                id='loginPassword'
                                value={loginInfo.password}
                                onChange={handleLoginChange} /><br />
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
                            <input
                                type='text'
                                name='first_name'
                                id='signupFirstName'
                                value={signupInfo.first_name}
                                onChange={handleSignupChange} /><br />
                        </div>
                        <div>
                            <label htmlFor='signupLastName'>Last Name</label><br />
                            <input
                                type='text'
                                name='last_name'
                                id='signupLastName'
                                value={signupInfo.last_name}
                                onChange={handleSignupChange} /><br />
                        </div>
                        <div>
                            <label htmlFor='signupUsername'>Username</label><br />
                            <input
                                type='text'
                                name='username'
                                id='signupUsername'
                                value={signupInfo.username}
                                onChange={handleSignupChange} /><br />
                        </div>
                        <div>
                            <label htmlFor='signupPassword'>Password</label><br />
                            <input
                                type='password'
                                name='password'
                                id='signupPassword'
                                value={signupInfo.password}
                                onChange={handleSignupChange} /><br />
                        </div>
                        <input type='submit' />
                    </form>
                </div>
            </Layout>
        </div>
    )
};

export default Login;



// import React, { useContext, useEffect, useState } from 'react';
// import { server } from '../../setting.js';
// import { UserContext } from '../../context/ContextStore.js';
// import axios from 'axios';
// import '../../App.css';
// // import Dashboard from '../dashboard/Dashboard.js';
// import { Link } from 'react-router-dom';

// function Login(props) {
//     // const[userState, dispatchUserState] = useContext(UserContext);
//     // ==== login ==== //
//     const [loginInfo, updateLoginInfo] = useState({
//         username: '',
//         password: '',
//         isLoggedIn: false,
//     });

//     // ==== Auth Token Check ==== //
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         if (localStorage.token) {
//             setIsLoggedIn(true);
//         } else {
//             setIsLoggedIn(false);
//         }
//     }, [isLoggedIn]);

//     const handleLoginChange = (event) => {
//         updateLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
//     };
//     const handleLoginSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post(`${server}/users/login`,
//                 {
//                     user: {
//                         username: loginInfo.username,
//                         password: loginInfo.password,
//                     }
//                 });
//                 localStorage.token = response.data.token;
//                 console.log(response);
//                 // props.history.push('/dashboard');
//             if (response.data.token) {
//                 localStorage.token = response.data.token;
//                 setIsLoggedIn(true);
//                 console.log('testing')
//                 console.log(isLoggedIn)
//                 // updateLoginInfo({
//                 //     username: '',
//                 //     password: '',
//                 //     isLoggedIn: false,
//                 // });
//             }
//             console.log(response);
//             console.log(response.data.user.first_name)
//             // props.history.push('/courses');
//         } catch (error) {
//             console.error(error)
//         }
//     };

//     // === signup ==== //
//     const [signupInfo, updateSignupInfo] = useState({
//         first_name: '',
//         last_name: '',
//         username: '',
//         password: '',
//         // isLoggedIn: false,
//     });

//     const handleSignupChange = (event) => {
//         updateSignupInfo({ ...signupInfo, [event.target.name]: event.target.value });
//     };
//     const handleSignupSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post(`${server}/users`,
//                 {
//                     user: {
//                         first_name: signupInfo.first_name,
//                         last_name: signupInfo.last_name,
//                         username: signupInfo.username,
//                         password: signupInfo.password,
//                     }
//                 });
//             localStorage.token = response.data.token;
//             console.log(response);
//             // localStorage.token = response.data.token;
//             // setIsLoggedIn(true);
//             // console.log(response);
//             // updateSignupInfo({
//             //     first_name: '',
//             //     last_name: '',
//             //     username: '',
//             //     password: '',
//             //     isLoggedIn: false,
//             // });
//             // props.history.push('/courses');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     // ==== return ==== //
//     return (
//         <div className="App">
//             <div>
//                 <h2>Log In</h2>
//                 <form onSubmit={handleLoginSubmit}>
//                     <div>
//                         <label htmlFor='loginUsername'>Username</label><br />
//                         <input
//                             type='text'
//                             name='username'
//                             id='loginUsername'
//                             value={loginInfo.username}
//                             onChange={handleLoginChange} /><br />
//                     </div>
//                     <div>
//                         <label htmlFor='loginPassword'>Password</label><br />
//                         <input
//                             type='password'
//                             name='password'
//                             id='loginPassword'
//                             value={loginInfo.password}
//                             onChange={handleLoginChange} /><br />
//                     </div>
//                     <input type='submit' />
//                 </form>
//             </div>
//             <div className='or'>
//                 {/* make a border separator */}
//             </div>
//             <div>
//                 <h2>Sign Up</h2>
//                 <form onSubmit={handleSignupSubmit}>
//                     <div>
//                         <label htmlFor='signupFirstName'>First Name</label><br />
//                         <input
//                             type='text'
//                             name='first_name'
//                             id='signupFirstName'
//                             value={signupInfo.first_name}
//                             onChange={handleSignupChange} /><br />
//                     </div>
//                     <div>
//                         <label htmlFor='signupLastName'>Last Name</label><br />
//                         <input
//                             type='text'
//                             name='last_name'
//                             id='signupLastName'
//                             value={signupInfo.last_name}
//                             onChange={handleSignupChange} /><br />
//                     </div>
//                     <div>
//                         <label htmlFor='signupUsername'>Username</label><br />
//                         <input
//                             type='text'
//                             name='username'
//                             id='signupUsername'
//                             value={signupInfo.username}
//                             onChange={handleSignupChange} /><br />
//                     </div>
//                     <div>
//                         <label htmlFor='signupPassword'>Password</label><br />
//                         <input
//                             type='password'
//                             name='password'
//                             id='signupPassword'
//                             value={signupInfo.password}
//                             onChange={handleSignupChange} /><br />
//                     </div>
//                     <input type='submit' />
//                 </form>
//             </div>
//             <div>
//                 <Link style={{ textDecoration: 'none' }} to={`/dashboard`}>
//                     <div key={loginInfo.id}>View Dashboard</div>
//                 </Link>
//             </div>
//         </div>
//     )
// };

// export default Login;