import { useFormik } from 'formik';
import { Button, Alert } from 'reactstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';

const RegisterPatientPage = () => {

    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);

    useEffect(() => {
        const errorTimeout = setTimeout(() => {
            setOpenErrorAlert(false);

            return () => clearTimeout(errorTimeout);
        }, 5000)
    }, [openErrorAlert]);

    useEffect(() => {
        const successTimeout = setTimeout(() => {
            setOpenSuccessAlert(false);

            return () => clearTimeout(successTimeout);
        }, 5000)
    }, [openSuccessAlert]);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            birthMonth: '',
            birthDay: '',
            birthYear: '',
            street: '',
            city: '',
            state: '',
            zip: ''
        },
        onSubmit: (values) => {
            axios.post('http://localhost:3001/newPatient', {
                firstName: values.firstName.toUpperCase(),
                lastName: values.lastName.toUpperCase(),
                dateOfBirthMonth: values.dateOfBirthMonth,
                dateOfBirthDay: values.dateOfBirthDay,
                dateOfBirthYear: values.dateOfBirthYear,
                street: values.street.toUpperCase(),
                city: values.city.toUpperCase(),
                state: values.state.toUpperCase(),
                zip: values.zip,
            })
                .then(response => {
                    if (response.data === 'success') {
                        setOpenSuccessAlert(true);
                    } else {
                        setOpenErrorAlert(true);
                    }
                })
                .catch(err => console.log(err));
        }
    })



    return (
        <div style={{ height: '100vh' }}>
            <form onSubmit={formik.handleSubmit}>
                <div className='container d-flex justify-content-center align-items-center flex-column'>
                    <Alert isOpen={openSuccessAlert} color='success'>
                        Successfully added patient!
                    </Alert>
                    <Alert isOpen={openErrorAlert} color='danger'>
                        An error occurred
                    </Alert>
                    <h1 class='patient-title'>New Patient:</h1>
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
                        <div className='d-flex justify-content-center'>
                            <button type='submit' class='patient-prescription-submit-button' outline>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default RegisterPatientPage;