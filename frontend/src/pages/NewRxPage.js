import { Container, Row, Col, Card } from 'reactstrap';
import { useFormik } from 'formik';
import axios from 'axios';

const NewRxPage = () => {

    const formik = useFormik({
        initialValues: {
            rxNumber: '',
            firstName: '',
            lastName: '',
            dateOfBirthMonth: '',
            dateOfBirthDay: '',
            dateOfBirthYear: '',
            address: '',
            drug: '',
        },
        onSubmit: (values, { resetForm }) => {
            axios.post('http://localhost:3001/newRx', {
                rxNumber: values.rxNumber,
                firstName: values.firstName,
                lastName: values.lastName,
                dateOfBirth: values.dateOfBirthMonth,
                dateOfBirthDay: values.dateOfBirthDay,
                dateOfBirthYear: values.dateOfBirthYear,
                address: values.address,
                drug: values.drug,
            })
            console.log(values);
            resetForm();
        }
    });
    return (
        <Container >
            <Card className='input-container'>
                <form class='input-body'>
                    <div class='inputBox'>
                        <Row>
                            <Col md='12'>
                                <input
                                    name='rxNumber'
                                    type='number'
                                    onChange={formik.handleChange}
                                    value={formik.values.rxNumber}
                                    required
                                />
                                <span>Rx #</span>
                            </Col>
                            <Col md='6'>
                                <input
                                    name='firstName'
                                    type='text'
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                    required
                                />
                                <span>First Name</span>
                            </Col>
                            <Col md='6'>
                                <input
                                    name='lastName'
                                    type='text'
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                    required
                                />
                                <span>Last Name</span>
                            </Col>
                        </Row>
                    </div>
                </form>
            </Card>
        </Container>
        // <form className='newrx-form' onSubmit={formik.handleSubmit}>
        //     <Row>
        //         <Col>
        //             <input
        //                 name='rxNumber'
        //                 type='number'
        //                 placeholder='Rx #'
        //                 onChange={formik.handleChange}
        //                 value={formik.values.rxNumber}
        //             />
        //         </Col>
        //     </Row>

        //     <Row>
        //         <Col md='6'>
        //             <input
        //                 className='input'
        //                 required
        //                 name='firstName'
        //                 type='text'
        //                 onChange={formik.handleChange}
        //                 value={formik.values.firstName}
        //             />
        //             <label className='placeholder'>First Name</label>
        //         </Col>
        //         <Col md='6'>
        //             <FormGroup>
        //                 <Input
        //                     name='lastName'
        //                     type='text'
        //                     placeholder='Last Name'
        //                     onChange={formik.handleChange}
        //                     value={formik.values.lastName}
        //                 />
        //             </FormGroup>
        //         </Col>
        //     </Row>

        //     <Row>
        //         <Col md='4'>
        //             <FormGroup>
        //                 <Input
        //                     name='dateOfBirthMonth'
        //                     type='text'
        //                     placeholder='MM'
        //                     onChange={formik.handleChange}
        //                     value={formik.values.dateOfBirthMonth}
        //                 />
        //             </FormGroup>
        //         </Col>
        //         <Col md='4'>
        //             <FormGroup>
        //                 <Input
        //                     name='dateOfBirthDay'
        //                     type='text'
        //                     placeholder='DD'
        //                     onChange={formik.handleChange}
        //                     value={formik.values.dateOfBirthDay}
        //                 />
        //             </FormGroup>
        //         </Col>
        //         <Col md='4'>
        //             <FormGroup>
        //                 <Input
        //                     name='dateOfBirthYear'
        //                     type='text'
        //                     placeholder='YYYY'
        //                     onChange={formik.handleChange}
        //                     value={formik.values.dateOfBirthYear}
        //                 />
        //             </FormGroup>
        //         </Col>
        //     </Row>

        //     <Col>
        //         <FormGroup>
        //             <Input
        //                 name='address'
        //                 type='text'
        //                 placeholder='Address'
        //                 onChange={formik.handleChange}
        //                 value={formik.values.address}
        //             />
        //         </FormGroup>
        //     </Col>

        //     <Col>
        //         <FormGroup>
        //             <Input
        //                 name='drug'
        //                 type='text'
        //                 placeholder='Drug'
        //                 onChange={formik.handleChange}
        //                 value={formik.values.drug}
        //             />
        //         </FormGroup>
        //     </Col>

        //     <Col>
        //         <FormGroup>
        //             <Button type='submit' color='primary' >Submit</Button>
        //         </FormGroup>
        //     </Col>

        // </form>

    )
};

export default NewRxPage;