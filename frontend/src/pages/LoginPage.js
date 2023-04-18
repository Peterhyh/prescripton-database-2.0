import { Container, Row, Col, Card, CardHeader, CardBody, Alert, Label, FormGroup, Button } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




const LoginPage = () => {

    let navigate = useNavigate();

    const changeRoute = () => {
        navigate('/');
    }

    const [openSuccessMessage, setOpenSuccessMessage] = useState(false);

    const [openErrorAlert, setOpenErrorAlert] = useState(false);

    useEffect(() => {
        const successTimeout = setTimeout(() => {
            setOpenSuccessMessage(false);
        }, 5000)

        return (() => {
            clearTimeout(successTimeout);
        })
    }, [openSuccessMessage]);

    useEffect(() => {
        const alertTimeout = setTimeout(() => {
            setOpenErrorAlert(false)
        }, 5000)

        return () => clearTimeout(alertTimeout)
    }, [openErrorAlert]);

    return (
        <Container style={{ height: '100vh' }}>
            <Alert color='danger' isOpen={openErrorAlert}>
                Incorrect username/password, please try again.
            </Alert>
            <Alert color='success' isOpen={openSuccessMessage}>
                Success!
            </Alert>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col className='col-sm-5'>
                    <Card className='p-3 m-3'>
                        <CardHeader>
                            <h1>Login</h1>
                        </CardHeader>
                        <CardBody>
                            <Formik
                                initialValues={{
                                    username: '',
                                    password: '',
                                }}
                                onSubmit={values => {
                                    axios.post('http://localhost:3001/users/login', {
                                        username: values.username,
                                        password: values.password
                                    })
                                        .then(response => {
                                            if (response.data.success == 'You are now logged in!') {
                                                setOpenSuccessMessage(true);
                                                changeRoute();
                                            } else {
                                                setOpenErrorAlert(true);
                                            }
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        })
                                }}

                            >
                                <Form>
                                    <FormGroup>
                                        <Label htmlFor='username'>Username</Label>
                                        <Field
                                            id='username'
                                            name='username'
                                            type='text'
                                            className='form-control'
                                        />
                                    </FormGroup>


                                    <FormGroup>
                                        <Label htmlFor='password'>Password</Label>
                                        <Field
                                            id='password'
                                            name='password'
                                            type='password'
                                            className='form-control'
                                        />
                                    </FormGroup>


                                    <FormGroup className='d-flex justify-content-center align-items-center'>
                                        <Button className='mt-3' type='submit' color='primary'>Login</Button>
                                    </FormGroup>


                                    <FormGroup>
                                        <Col>
                                            <a href='/'>Forgot password</a>
                                        </Col>
                                        <Col>
                                            <a href='/registerUser'>Create account</a>
                                        </Col>
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

export default LoginPage;