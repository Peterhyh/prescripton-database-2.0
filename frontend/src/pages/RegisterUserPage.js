import { Container, Row, Col, FormGroup, Card, CardHeader, CardBody, Button, Label, Alert } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { validateRegisterUserSchema } from '../utils/validateRegisterUserSchema';
import { useState, useEffect } from 'react';
import EyeOpened from '../app/assets/img/eyeOpened.svg';
import EyeClosed from '../app/assets/img/eyeClosed.svg';

const RegisterUserPage = () => {

    const [revealPassword, setRevealPassword] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);


    useEffect(() => {
        const errorTimeout = setTimeout(() => {
            setOpenErrorAlert(false);
        }, 5000)

        return () => {
            clearTimeout(errorTimeout);
        }
    }, [openErrorAlert]);

    useEffect(() => {
        const errorTimeout = setTimeout(() => {
            setOpenSuccessAlert(false);
        }, 5000)

        return () => {
            clearTimeout(errorTimeout);
        }
    }, [openSuccessAlert]);

    return (
        <Container style={{ height: '100vh', padding: '20px' }}>
            <Button href='/' color='primary' outline>Back</Button>
            <Row className='d-flex justify-content-center'>
                <Col className='col-sm-7'>
                    <Alert style={{ width: '100%' }} isOpen={openSuccessAlert} color='success' >
                        You are successfully registered!
                    </Alert>
                    <Alert style={{ width: '100%' }} isOpen={openErrorAlert} color='danger' >
                        Username/E-mail has already been registered.
                    </Alert>
                    <Card>
                        <CardHeader>
                            <h1>Register User</h1>
                        </CardHeader>
                        <CardBody>
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    username: '',
                                    password: '',
                                }}
                                onSubmit={values => {
                                    axios.post('http://localhost:3001/users/signup', {
                                        firstName: values.firstName.toUpperCase(),
                                        lastName: values.lastName.toUpperCase(),
                                        email: values.email.toLowerCase(),
                                        username: values.username.toLowerCase(),
                                        password: values.password,
                                    })
                                        .then(response => {
                                            if (response.data) {
                                                setOpenSuccessAlert(true);
                                            } else if (response.message) {
                                                console.log(response.message)
                                            }
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                }}
                                validate={validateRegisterUserSchema}
                            >
                                <Form className='d-flex justify-content-center align-items-center flex-column'>
                                    <FormGroup >
                                        <Label htmlFor='firstName'>First Name:</Label>

                                        <Field
                                            type='text'
                                            className='form-control'
                                            name='firstName'
                                            id='firstName'
                                        />

                                        <ErrorMessage name='firstName'>
                                            {(msg) => <p className='text-danger'>{msg}</p>}
                                        </ErrorMessage>
                                    </FormGroup>


                                    <FormGroup>
                                        <Label htmlFor='lastName'>Last Name:</Label>

                                        <Field
                                            type='text'
                                            className='form-control'
                                            name='lastName'
                                            id='lastName'
                                        />

                                        <ErrorMessage name='lastName'>
                                            {(msg) => <p className='text-danger'>{msg}</p>}
                                        </ErrorMessage>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor='email'>E-mail:</Label>

                                        <Field
                                            type='text'
                                            className='form-control'
                                            name='email'
                                            id='email'
                                        />

                                        <ErrorMessage name='email'>
                                            {(msg) => <p className='text-danger'>{msg}</p>}
                                        </ErrorMessage>
                                    </FormGroup>


                                    <FormGroup >
                                        <Label htmlFor='username'>Username:</Label>

                                        <Field
                                            type='text'
                                            className='form-control'
                                            name='username'
                                            id='username'
                                        />

                                        <ErrorMessage name='username'>
                                            {(msg) => <p className='text-danger'>{msg}</p>}
                                        </ErrorMessage>
                                    </FormGroup>


                                    <FormGroup >

                                        <Label htmlFor='password'>Password:</Label>



                                        <Field
                                            type={revealPassword ? 'text' : 'password'}
                                            className='form-control'
                                            name='password'
                                            id='password'
                                        />

                                        <img onClick={() => setRevealPassword(!revealPassword)} src={revealPassword ? EyeOpened : EyeClosed} style={{ height: '20px', width: '20px' }} />



                                        <ErrorMessage name='password'>
                                            {(msg) => <p className='text-danger'>{msg}</p>}
                                        </ErrorMessage>
                                    </FormGroup>


                                    <FormGroup >
                                        <Label htmlFor='confirmPassword'>Confirm Password:</Label>
                                        <Field
                                            type={revealPassword ? 'text' : 'password'}
                                            className='form-control'
                                            name='confirmPassword'
                                            id='confirmPassword'
                                        />

                                        <ErrorMessage name='confirmPassword'>
                                            {(msg) => <p className='text-danger'>{msg}</p>}
                                        </ErrorMessage>
                                    </FormGroup>
                                    <FormGroup >
                                        <Button type='submit' color='primary'>Submit</Button>
                                    </FormGroup>
                                </Form>
                            </Formik>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
};

export default RegisterUserPage;