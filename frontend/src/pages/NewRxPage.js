import { Col, Row, Alert } from 'reactstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState, useEffect } from 'react';

const NewRxPage = () => {


    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleSuccessDismiss = () => {
        setOpenSuccess(!openSuccess);
    };

    const handleErrorDismiss = () => {
        setOpenError(!openError);
    };

    useEffect(() => {

        const successTimeout = setTimeout(() => {
            setOpenSuccess(false)
        }, 3000)

        return () => {
            clearTimeout(successTimeout)
        }
    }, [openSuccess]);

    useEffect(() => {

        const errorTimeout = setTimeout(() => {
            setOpenError(false);
        }, 3000)

        return () => {
            clearTimeout(errorTimeout);
        }
    }, [openError]);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            dateOfBirthMonth: '',
            dateOfBirthDay: '',
            dateOfBirthYear: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            drug: '',
            quanity: '',
            refills: '',
            direction: '',
            daySupply: '',
        },
        onSubmit: (values) => {
            axios.post('http://localhost:3001/newRx', {
                firstName: values.firstName.toUpperCase(),
                lastName: values.lastName.toUpperCase(),
                dateOfBirthMonth: values.dateOfBirthMonth,
                dateOfBirthDay: values.dateOfBirthDay,
                dateOfBirthYear: values.dateOfBirthYear,
                street: values.street.toUpperCase(),
                city: values.city.toUpperCase(),
                state: values.state.toUpperCase(),
                zip: values.zip,
                drug: values.drug.toUpperCase(),
                quanity: values.quanity,
                refills: values.refills,
                direction: values.direction,
                daySupply: values.daySupply,
            })
                .then(response => {
                    if (response.data === 'Data was added to the database successfully.') {
                        setOpenSuccess(!openSuccess);
                    } else if (response.data === 'Last name has already been added to the database.') {
                        setOpenError(!openError);
                    } else {
                        alert('ERROR CODE: 500')
                    }

                })
                .catch(error => {
                    console.log(error);
                })

        }
    });
    return (
        <div>
            <form className='input-body' onSubmit={formik.handleSubmit}>
                <div className='container d-flex justify-content-center align-items-center flex-column'>
                    <h1 class='new-rx-page-title' >Data Entry</h1>
                    <Alert className='success-alert' isOpen={openSuccess} color='success' toggle={handleSuccessDismiss}>
                        Data was send sucessfully.
                    </Alert>
                    <Alert className='error-alert' isOpen={openError} color='danger' toggle={handleErrorDismiss}>
                        Duplicate data found in the database. Please try a different name.
                    </Alert>
                    <h5 class='patient-title'>PATIENT INFORMATION:</h5>
                    <div className='row inputBox-name'>
                        <div class='col-sm-6'>
                            <input
                                name='firstName'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                required
                            />
                            <span class='first-name-span'>First Name</span>
                        </div>
                        <div class='col-sm-6'>
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
                        <div class='col-sm-4'>
                            <input
                                name='dateOfBirthMonth'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values.dateOfBirthMonth}
                                required
                            />
                            <span class='dob-month-span'>Birth Month</span>
                        </div>
                        <div class='col-sm-4'>
                            <input
                                name='dateOfBirthDay'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values.dateOfBirthDay}
                                required
                            />
                            <span class='dob-day-span'>Birth Day</span>
                        </div>
                        <div class='col-sm-4'>
                            <input
                                name='dateOfBirthYear'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values.dateOfBirthYear}
                                required
                            />
                            <span class='dob-year-span'>Birth Year</span>
                        </div>
                    </div>

                    <div className='row inputBox-street '>
                        <div class='col-sm-12 '>
                            <input
                                name='street'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values.street}
                                required
                            />
                            <span class='inputBox-street-span'>Street</span>
                        </div>
                    </div>

                    <div className='row inputBox-city-state-zip '>
                        <div class='col-sm-4 '>
                            <input
                                name='city'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                required
                            />
                            <span class='inputBox-city-span'>City</span>
                        </div>

                        <div class='col-sm-4 '>
                            <input
                                id='state'
                                name='state'
                                onChange={formik.handleChange}
                                value={formik.values.state}
                                required
                            />
                            <span class='inputBox-state-span'>State</span>
                        </div>

                        <div class='col-sm-4 '>
                            <input
                                name='zip'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values.zip}
                                required
                            />
                            <span class='inputBox-zip-span'>Zip</span>
                        </div>
                    </div>

                    <h5 class='prescription-title'>PRESCRIPTION:</h5>
                    <div className='row inputBox-drug '>
                        <div class='col-sm-12 '>
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

                    <div className='row inputBox-sig '>
                        <div class='col-sm-12 '>
                            <input
                                name='direction'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values.direction}
                                required
                            />
                            <span class='inputBox-sig-span'>Direction</span>
                        </div>
                    </div>

                    <div className='row inputBox-quanity-refills'>
                        <div class='col-sm-4 '>
                            <input
                                name='quanity'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values.quanity}
                                required
                            />
                            <span class='inputBox-quanity-span'>Quanity</span>
                        </div>
                        <div class='col-sm-4 '>
                            <input
                                name='refills'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values.refills}
                                required
                            />
                            <span class='inputBox-refills-span'>Refills</span>
                        </div>
                        <div class='col-sm-4 '>
                            <input
                                name='daySupply'
                                type='text'
                                onChange={formik.handleChange}
                                value={formik.values.daySupply}
                                required
                            />
                            <span class='inputBox-day-supply-span'>Day Supply</span>
                        </div>
                    </div>

                    <Row>
                        <Col className='data-entry-button'>
                            <button type='submit' class='patient-prescription-submit-button' outline>Submit</button>
                        </Col>
                    </Row>

                </div>

            </form >
        </div>
    )
};

export default NewRxPage;