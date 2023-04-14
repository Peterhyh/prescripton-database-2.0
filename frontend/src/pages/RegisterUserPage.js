import { Container, Row, Col, Input, Label, Form, FormGroup, Card } from 'reactstrap';
import { useFormik } from 'formik';
import axios from 'axios';

const RegisterUserPage = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: (values) => {
            axios.post('http://localhost:3001/registerUser', {
                firstName: values.firstName.toUpperCase(),
                lastName: values.lastName.toUpperCase(),
                username: values.username.toLowerCase(),
                password: values.password,
                confirmPassword: values.confirmPassword,
            })
        },
    })
    return (
        <Container>
            <Row>
                <Col>
                    <Card>

                    </Card>
                </Col>
            </Row>
        </Container>
    )
};

export default RegisterUserPage;