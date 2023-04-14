import { Container, Row, Col, Card, CardHeader, CardBody, Input, Label, Form, FormGroup, Button } from 'reactstrap';
import { useFormik } from 'formik';
import axios from 'axios';

const LoginPage = () => {

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: (values) => {
            axios.post('http://localhost:3001', {
                username: values.username,
                password: values.password
            })
                .then(response => {
                    console.log(JSON.stringify(response));
                })
                .catch(err => console.error(err));
        }
    });

    return (
        <Container style={{ height: '100vh' }}>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col className='col-sm-5'>
                    <Card className='p-3 m-3'>
                        <CardHeader>
                            <h1>Login</h1>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={formik.handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor='username'>Username</Label>
                                    <Input
                                        name='username'
                                        type='string'
                                        onChange={formik.handleChange}

                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor='password'>Password</Label>
                                    <Input
                                        name='password'
                                        type='string'
                                        onChange={formik.handleChange}

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
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
};

export default LoginPage;