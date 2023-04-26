import { Col, Row, Alert } from 'reactstrap';
import { useFormik } from 'formik';
import SelectedPatient from './SelectedPatient';
import axios from 'axios';
import { useState, useEffect } from 'react';

const DataEntry = ({ uploadedRx, selectedLastName, selectedFirstName, setSelectedLastName, setSelectedFirstName, selectedId, }) => {

    const [openSuccess, setOpenSuccess] = useState(false);

    useEffect(() => {
        const successTimer = setTimeout(() => {
            setOpenSuccess(false);

            return () => clearTimeout(successTimer);
        }, 5000)
    })



    const formik = useFormik({
        initialValues: {
            patientId: '',
            drug: '',
            quanity: '',
            refills: '',
            direction: '',
            daySupply: '',
        },
        onSubmit: (values) => {
            axios.post('http://localhost:3001/newRx', {
                patientId: JSON.stringify(selectedId),
                drug: values.drug.toUpperCase(),
                quanity: values.quanity,
                refills: values.refills,
                direction: values.direction,
                daySupply: values.daySupply,
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log('success');
                        setOpenSuccess(true);
                    } else {
                        console.log('error');
                    }
                })
                .catch(error => {
                    console.log(error);
                })

        }
    });

    return (
        <>
            <Alert className='d-flex justify-content-center' color='success' isOpen={openSuccess}>
                Prescription saved successfully!
            </Alert>
            <div className='dataentry-container'>

                <div className='dataentry-left'>
                    <div>
                        <h1>Uploaded Rx:</h1>
                        <img src={uploadedRx} alt='uploaded rx' />
                    </div>
                    <div className={selectedLastName && selectedFirstName ? 'new-rx-selected-patient' : 'hide'}>
                        <SelectedPatient
                            selectedLastName={selectedLastName}
                            selectedFirstName={selectedFirstName}
                            setSelectedLastName={setSelectedLastName}
                            setSelectedFirstName={setSelectedFirstName} />
                    </div>
                </div>


                <div className='dataentry-right'>
                    <form onSubmit={formik.handleSubmit}>
                        <h1 class='prescription-title'>PRESCRIPTION:</h1>

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
                                <span class='inputBox-quanity-span'>Quantity</span>
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

                    </form >
                </div>
            </div>
        </>
    )
};

export default DataEntry;