import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/Register.css';


const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const RegisterPage = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        setValidUsername(result);
    }, [username]);

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const verifyUsername = USERNAME_REGEX.test(username);
        const verifyPassword = PASSWORD_REGEX.test(password);

        if (!verifyUsername || !verifyPassword) {
            setErrMsg('SECURITY ERROR');
            return;
        }

        try {
            const response = await axios.post(
                'http://18.212.66.103:8000/users/signup',
                JSON.stringify({
                    username: username.toLowerCase(),
                    password: password,
                    firstName: firstName.toLowerCase(),
                    lastName: lastName.toLowerCase(),
                    email: email.toLocaleLowerCase()
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username already taken');
            } else if (err.response?.status === 410) {
                setErrMsg('Email already registered');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }


    return (
        <>
            {success ? (
                <div className='register-success-page'>
                    <div>
                        <h1>Successfully Registered!</h1>
                        <Link className='register-success-page-return-button' to='/login'>Return back to login</Link>
                    </div>
                </div>
            ) : (
                <div className='register-container'>
                    <div className='register-back-button-row'>
                        <Link className='register-back-button' to='/login' >Back</Link>
                    </div>

                    <div className='register-card'>
                        <p className={errMsg ? 'register-error-message' : 'hide'} ref={errRef} aria-live='assertive'>
                            {errMsg}
                        </p>
                        <h1>REGISTER</h1>
                        <form className='register-form' onSubmit={handleSubmit}>
                            <div>
                                <span className={validUsername ? 'valid' : 'hide'}>
                                    Valid
                                </span>
                                <span className={validUsername || !username ? 'hide' : 'invalid'}>
                                    Invalid
                                </span>
                            </div>
                            <input
                                placeholder='Username'
                                type='text'
                                id='username'
                                ref={userRef}
                                autoComplete='off'
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setUsernameFocus(true)}
                                onBlur={() => setUsernameFocus(false)}
                                required
                            />
                            <p className={usernameFocus && username && !validUsername ? 'instructions' : 'hide'} id='uidnote'>
                                •Must contain 4 to 24 characters<br />
                                •Must begin with a letter<br />
                            </p>

                            <div>
                                <span className={validPassword ? 'valid' : 'hide'}>
                                    Valid
                                </span>
                                <span className={validPassword || !password ? 'hide' : 'invalid'}>
                                    Invalid
                                </span>
                            </div>
                            <input
                                placeholder='Password'
                                type='password'
                                id='password'
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                                required
                            />
                            <p className={passwordFocus && !validPassword ? 'instructions' : 'hide'} id='passwordnote'>
                                •Must contain 8 to 24 characters<br />
                                •Must contain a uppercase letter, a lowercase letter, a number, and <br />
                                a special character.<br />
                            </p>


                            <div>
                                <span className={validMatch && matchPassword ? 'valid' : 'hide'}>
                                    Valid
                                </span>
                                <span className={validMatch || !matchPassword ? 'hide' : 'invalid'}>
                                    Invalid
                                </span>
                            </div>
                            <input
                                placeholder='Confirm Password'
                                type='password'
                                id='confirmPassword'
                                onChange={(e) => setMatchPassword(e.target.value)}
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                required
                            />
                            <p className={matchFocus && !validMatch ? 'instructions' : 'hide'} id='confirmnote'>
                                •Password must match
                            </p>

                            <input
                                placeholder='First Name'
                                type='text'
                                id='firstName'
                                onChange={(e) => setFirstName(e.target.value)}
                            />

                            <input
                                placeholder='Last Name'
                                type='text'
                                id='lastName'
                                onChange={(e) => setLastName(e.target.value)}
                            />

                            <input
                                placeholder='E-mail'
                                type='text'
                                id='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className='register-button-container'>
                                <button className='register-button' disabled={!validUsername || !validPassword || !validMatch ? true : false} onClick={handleSubmit} >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            )};
        </>
    )
};

export default RegisterPage;