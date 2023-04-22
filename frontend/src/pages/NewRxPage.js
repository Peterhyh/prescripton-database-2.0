import { Col, Row } from 'reactstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchTable from '../components/SearchTable';
import Header from '../components/Header';


const NewRxPage = () => {

    const [query, setQuery] = useState();
    const [value, setValue] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);


    const handleSuccessDismiss = () => {
        setOpenSuccess(!openSuccess);
    };


    const handleErrorDismiss = () => {
        setOpenError(!openError);
    };


    const search = (value) => {
        return value.filter(patient => patient.firstName.toLowerCase().includes(query) || patient.lastName.toLowerCase().includes(query));
    }


    useEffect(() => {
        axios.get('http://localhost:3001/newPatient')
            .then(json => {
                setValue(json.data)
                console.log(json.data)
            })
            .catch(err => console.log(err));
    }, []);


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
        <>
            <Header />
            <div className='newrx-container'>

                <h1 className='newrx-searchbar-title'>Select Patient:</h1>

                <div className='newrx-searchbar-container'>
                    <div className='newrx-searchbar-row'>
                        <input
                            placeholder='Search...'
                            type='text'
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <SearchTable value={search(value)} query={query} />
                </div>




                <form className='input-body' onSubmit={formik.handleSubmit}>
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

                </form >
            </div >
        </>
    )
};

export default NewRxPage;