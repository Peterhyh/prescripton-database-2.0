import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

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
                'http://localhost:3001/users/login',
                JSON.stringify({ username: username.toLowerCase(), password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
                .then(response => {
                    if (response.status === 200) {
                        const accessToken = response.data.accessToken;
                        const refreshToken = response.data.refreshToken;
                        console.log(refreshToken);
                        setAuth({ username, password, accessToken, refreshToken })
                        setUsername('');
                        setPassword('');
                        navigate(from, { replace: true });
                    }
                })
                .catch(err => {
                    if (!err?.response) {
                        setErrMsg('No Server Response');
                    } else if (err?.response?.status === 400) {
                        setErrMsg('User does not exist');

                    } else if (err?.response?.status === 409) {
                        setErrMsg('Incorrect Password');
                    } else {
                        setErrMsg('Failed to Login');
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
                <h1>Login</h1>
                <form className='login-form' onSubmit={handleSubmit}>
                    <label htmlFor='username'>
                        Username:
                    </label>
                    <input
                        type='text'
                        id='username'
                        value={username}
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor='password'>
                        Password:
                    </label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className='login-button-container'>
                        <button>LOGIN</button>
                    </div>

                </form>
                <div className='login-register-section-container'>
                    <p>Don't have an account?</p>
                    <Link to='/register'>Create account</Link>
                </div>
            </card>
        </section >
    )
};

export default LoginPage;