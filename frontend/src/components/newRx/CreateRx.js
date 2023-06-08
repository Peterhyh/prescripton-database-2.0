import { Alert } from 'reactstrap';
import SelectedPatient from './SelectedPatient';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './css/CreateRx.css';


const VERIFY_NUMBER = /^[0-9]{1,}$/

const CreateRx = ({ uploadedRx, selectedLastName, selectedFirstName, setSelectedLastName, setSelectedFirstName, selectedId, }) => {

    const [openSuccess, setOpenSuccess] = useState(false);

    const [drugName, setDrugName] = useState('');
    const [direction, setDirection] = useState('');

    const [qty, setQty] = useState('');
    const [verifyQty, setVerifyQty] = useState('');

    const [refill, setRefill] = useState('');
    const [daySupply, setDaySupply] = useState('');

    const handleClear = () => {
        setSelectedLastName('');
        setSelectedFirstName('');
    };

    useEffect(() => {
        const successTimer = setTimeout(() => {
            setOpenSuccess(false);

            return () => clearTimeout(successTimer);
        }, 5000)
    }, [openSuccess])

    useEffect(() => {
        const verifyQty = VERIFY_NUMBER.test(qty);
        setVerifyQty(verifyQty);
    }, [qty])



    return (
        <>
            <Alert className='d-flex justify-content-center' color='success' isOpen={openSuccess}>
                Prescription saved successfully!
            </Alert>
            <div className='dataentry-container'>

                <div className='dataentry-left'>
                    <div className='dataentry-left-row-top'>
                        <h1>Uploaded Rx:</h1>
                        <img src={uploadedRx} alt='uploaded rx' />
                    </div>

                    <div className={selectedLastName && selectedFirstName ? 'selectedPatientContainer' : 'hide'}>
                        <SelectedPatient
                            selectedLastName={selectedLastName}
                            selectedFirstName={selectedFirstName}
                            setSelectedLastName={setSelectedLastName}
                            setSelectedFirstName={setSelectedFirstName} />
                    </div>
                </div>


                <div className='dataentry-right'>
                    <form >
                        <h1 class='prescription-title'>PRESCRIPTION:</h1>
                        <div className='row inputBox-drug'>
                            <div class='col-sm-12 '>
                                <input
                                    name='drug'
                                    type='text'
                                    onChange={(e) => setDrugName(e.target.value)}
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
                                    onChange={(e) => setDirection(e.target.value)}
                                    required
                                />
                                <span class='inputBox-sig-span'>Direction</span>
                            </div>
                        </div>

                        <div className='inputBox-quanity-refills'>
                            <div class='createRxQtyContainer'>
                                <input
                                    name='quanity'
                                    type='text'
                                    onChange={(e) => setQty(e.target.value)}
                                    required
                                />
                                <span class='inputBox-quanity-span'>Quantity</span>
                            </div>
                            <div class='createRxRefillContainer'>
                                <input
                                    name='refills'
                                    type='text'
                                    onChange={(e) => setRefill(e.target.value)}
                                    required
                                />
                                <span class='inputBox-refills-span'>Refills</span>
                            </div>
                            <div class='createRxDaySupplyContainer'>
                                <input
                                    name='daySupply'
                                    type='text'
                                    onChange={(e) => setDaySupply(e.target.value)}
                                    required
                                />
                                <span class='inputBox-day-supply-span'>Day Supply</span>
                            </div>
                        </div>

                        <div className='data-entry-button-container'>
                            <button type='submit' outline>Submit</button>
                        </div>

                    </form >

                    <div className='dataEntryInstruction'>
                        <div>
                            <h1>Step 3:</h1>
                            <ul>
                                <li>
                                    Here we will enter the prescription drug information and save it to the patient's profile.<br /><br />
                                </li>
                                <li>
                                    Enter in the Drug name (Amoxicillin 250mg), direction (Take 2 tablets by mouth three times
                                    daily for 7 days), quantity (#42), refills (0 by default if not specified), and the day's supply (7).<br /><br />
                                </li>
                                <li>
                                    Once you have filled out the form completely, you are done with this prescription and ready to
                                    move on. Let's check to see if the medication you submitted is now in the patient's profile. Click
                                    "Patient Search" on the navigation bar above to continue.<br /><br />
                                </li>
                                <li>
                                    In a professional setting, sometimes you will see the direction written in sig codes like the
                                    example prescription here. Our job is to translate the codes into english or any language the
                                    patient chooses. In this demo, we will use english.<br /><br />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreateRx;