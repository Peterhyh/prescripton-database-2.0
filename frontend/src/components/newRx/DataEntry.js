import { Col, Row } from 'reactstrap';
import { useFormik } from 'formik';
import axios from 'axios';

const DataEntry = () => {
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
                    console.log(response.data)

                })
                .catch(error => {
                    console.log(error);
                })

        }
    });

    return (
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
    )
};

export default DataEntry;