import React, { useContext, useEffect, useState } from 'react';
import { server } from '../../setting.js';
import { UserContext } from '../../context/ContextStore.js';
import axios from 'axios';
import '../../App.css';
import Layout from '../layout/Layout.js';
import jwt_decode from 'jwt-decode';
import '../main.css';

function Login(props) {
    const [userState, dispatchUserState] = useContext(UserContext);
    const [user, setUser] = useState({
        id: ''
    });
    // ==== Auth Token Check ==== //
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if (localStorage.token != 'undefined' && localStorage.token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        console.log("isLoggedIn: ", isLoggedIn);
        // console.log(userState)
    }, [isLoggedIn]);

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
            // localStorage.setItem('token', response.data.token);
            // localStorage.getItem('token');
            // localStorage.setItem('id', response.data.user.id);
            // localStorage.setItem('user', JSON.stringify(user));
            // JSON.parse(localStorage.getItem('user'));
            setIsLoggedIn(true);
            console.log(localStorage)
            localStorage.token = response.data.token;
            const token = localStorage.token;
            const decoded = jwt_decode(token);
            console.log(decoded);
            localStorage.setItem('id', response.data.user.id)
            // decode header by passing in options (useful for when you need `kid` to verify a JWT):
            // const decodedHeader = jwt_decode(token, { header: true });
            // console.log(decodedHeader);
            console.log(localStorage)
            console.log(user)
            console.log(response.data.user.first_name, response.data.user.id)
            // console.log(userState);
            props.history.push('/dashboard');
        } catch (error) {
            console.error(error)
        }
    };
    const [userMain, getUserMain] = useState({
        id: '',
        first_name: '',
        last_name: '',
        username: '',
        courses: [],
    });

    const decodedToken = (token) => {
		return jwt_decode(token);
    };
    useEffect(()=>{
        (async()=> {
            try{
                const idx = decodedToken(localStorage.token).user.id
                console.log(idx)
                const response = await axios.get(`${server}/users/${idx}`)
                console.log(response)
                getUserMain({userMain, ...response.data});
            } catch (error) {
                console.error(error);
            }
        }) ();
    }, []);
    console.log(userMain);

    // === signup ==== //
    const [signupInfo, updateSignupInfo] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        // isLoggedIn: false,
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
            localStorage.setItem('token', response.data.token);
            localStorage.getItem('token');
            localStorage.setItem('id', user.id);
            localStorage.setItem('user', JSON.stringify(user));
            JSON.parse(localStorage.getItem('user'));

            setIsLoggedIn(true);
            console.log(isLoggedIn)
            console.log(response.data.user.first_name)
            console.log(response, userState);
            props.history.push('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };


    // ==== return ==== //
    return (
        <div>
            <Layout isLoggedIn={isLoggedIn}>
                <div className="container login-page">
                    <div className="card log-in">
                        <h3>Log In</h3>
                        <div className="row">
                            <form className="col s12" onSubmit={handleLoginSubmit}>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input
                                            className="validate"
                                            type='text'
                                            name='username'
                                            id='loginUsername'
                                            placeholder='username'
                                            value={loginInfo.username}
                                            onChange={handleLoginChange} />
                                        {/* <label htmlFor='loginUsername'>Username</label> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input
                                            className="validate"
                                            type='password'
                                            name='password'
                                            id='loginPassword'
                                            value={loginInfo.password}
                                            placeholder="password"
                                            onChange={handleLoginChange} />
                                        {/* <label htmlFor='loginPassword'>Password</label> */}
                                    </div>
                                </div>
                                <input className="btn pink darken-2 waves-effect btn-medium" type='submit' />
                            </form>
                        </div>
                    </div>
                    <div className='or'>
                        {/* make a border separator */}
                    </div>
                    <div className="card sign-up">
                        <h3>Sign Up</h3>
                        <div className="row">
                            <form className="col s12" onSubmit={handleSignupSubmit}>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input
                                            className="validate"
                                            type='text'
                                            name='first_name'
                                            id='signupFirstName'
                                            value={signupInfo.first_name}
                                            placeholder="First Name"
                                            onChange={handleSignupChange} />
                                        {/* <label htmlFor='signupFirstName'>First Name</label> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input
                                            className="validate"
                                            type='text'
                                            name='last_name'
                                            id='signupLastName'
                                            value={signupInfo.last_name}
                                            placeholder="Last Name"
                                            onChange={handleSignupChange} />
                                        {/* <label htmlFor='signupLastName'>Last Name</label> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input
                                            className="validate"
                                            type='text'
                                            name='username'
                                            id='signupUsername'
                                            value={signupInfo.username}
                                            placeholder="username"
                                            onChange={handleSignupChange} />
                                        {/* <label htmlFor='signupUsername'>Username</label> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input
                                            className="validate"
                                            type='password'
                                            name='password'
                                            id='signupPassword'
                                            value={signupInfo.password}
                                            placeholder="password"
                                            onChange={handleSignupChange} />
                                        {/* <label htmlFor='signupPassword'>Password</label> */}
                                    </div>
                                </div>
                                <input className="btn pink darken-2 waves-effect btn-medium" type='submit' />
                            </form>
                        </div>
                    </div>
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