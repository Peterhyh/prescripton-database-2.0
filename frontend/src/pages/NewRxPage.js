import { Card, Col, Row, Button } from 'reactstrap';
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
                dateOfBirthMonth: values.dateOfBirthMonth,
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
        <form className='input-body' onSubmit={formik.handleSubmit}>

            <div className='container d-flex justify-content-center align-items-center flex-column'>
                <h1 class='text-white p-5' >Data Entry</h1>
                <div className='row inputBox-rx-number '>

                    <div class='col-md-12 '>
                        <input
                            name='rxNumber'
                            type='number'
                            onChange={formik.handleChange}
                            value={formik.values.rxNumber}
                            required
                        />
                        <span>Rx #</span>
                    </div>
                </div>

                <div className='row inputBox-name'>
                    <div class='col-md-6 col-sm-6'>
                        <input
                            name='firstName'
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            required
                        />
                        <span class='first-name-span'>First Name</span>
                    </div>
                    <div class='col-md-6 col-sm-6'>
                        <input
                            name='lastName'
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            required
                        />
                        <span class='last-name-span'>Last Name</span>
                    </div>
                </div>

                <div className='row inputBox-dob'>
                    <div class='col-md-4 col-sm-4'>
                        <input
                            name='dateOfBirthMonth'
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.dateOfBirthMonth}
                            required
                        />
                        <span class='dob-month-span'>MM</span>
                    </div>
                    <div class='col-md-4 col-sm-4'>
                        <input
                            name='dateOfBirthDay'
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.dateOfBirthDay}
                            required
                        />
                        <span class='dob-day-span'>DD</span>
                    </div>
                    <div class='col-md-4 col-sm-4'>
                        <input
                            name='dateOfBirthYear'
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.dateOfBirthYear}
                            required
                        />
                        <span class='dob-year-span'>YY</span>
                    </div>
                </div>

                <div className='row inputBox-address '>
                    <div class='col-md-12 '>
                        <input
                            name='address'
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            required
                        />
                        <span class='inputBox-address-span'>Address</span>
                    </div>
                </div>

                <div className='row inputBox-drug '>
                    <div class='col-md-12 '>
                        <input
                            name='drug'
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.drug}
                            required
                        />
                        <span class='inputBox-drug-span'>Drug</span>
                    </div>
                </div>

                <Row>
                    <Col class='p-5'>
                        <Button type='submit' color='info' outline>Submit</Button>
                    </Col>
                </Row>

            </div>

        </form >
    )
};

export default NewRxPage;