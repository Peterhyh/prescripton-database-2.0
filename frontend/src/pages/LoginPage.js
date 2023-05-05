import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import './css/Login.css';

const LoginPage = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                'http://18.212.66.103:8000/users/login',
                JSON.stringify({ username: username.toLowerCase(), password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
                .then(response => {
                    if (response.status === 200) {
                        // const accessToken = response.data.accessToken;
                        // const refreshToken = response.data.refreshToken;
                        // console.log(refreshToken);
                        const username = response.data.username;
                        setAuth({ username })
                        setUsername('');
                        setPassword('');
                        navigate('/');
                    }
                })
                .catch(err => {
                    if (!err?.response) {
                        setErrMsg('No Server Response');
                    } else if (err?.response?.status === 400) {
                        setErrMsg('Username/Password mismatched');

                    } else if (err?.response?.status === 409) {
                        setErrMsg('Username/Password mismatched');
                    } else {
                        setErrMsg('Login Failed');
                    }
                });
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <section className='login-container'>
            <card className='login-card'>
                <p ref={errRef} className={errMsg ? 'login-error-message' : 'hide'}>
                    {errMsg}
                </p>

                <form className='login-form' onSubmit={handleSubmit}>
                    <h1>LOGIN</h1>
                    <input
                        placeholder='Username'
                        type='text'
                        id='username'
                        value={username}
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        placeholder='Password'
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className='login-button-container'>
                        <button>SIGN IN</button>
                    </div>

                    <div className='login-register-section-container'>
                        <p>Don't have an account?</p>
                        <Link className='register-link' to='/register'>Click Here</Link>
                    </div>

                </form>

            </card>
        </section >
    )
};

export default LoginPage;