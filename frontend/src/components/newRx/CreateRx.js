import { Alert } from 'reactstrap';
import SelectedPatient from './SelectedPatient';
import axios from 'axios';
import { useState, useEffect } from 'react';
import RedAlert from '../../app/assets/img/redAlert.svg';
import './css/CreateRx.css';


const VERIFY_NUMBER = /^\d{1,}$/

const CreateRx = ({ uploadedRx, selectedLastName, selectedFirstName, setSelectedLastName, setSelectedFirstName, selectedId, }) => {

    const [openSuccess, setOpenSuccess] = useState(false);

    const [drugName, setDrugName] = useState('');
    const [direction, setDirection] = useState('');

    const [qty, setQty] = useState('');
    const [verifyQty, setVerifyQty] = useState();
    const [triggerQtyError, setTriggerQtyError] = useState();

    const [refill, setRefill] = useState('');
    const [verifyRefill, setVerifyRefill] = useState();
    const [triggerRefillError, setTriggerError] = useState();

    const [daySupply, setDaySupply] = useState('');

    const handleClear = () => {
        setSelectedLastName('');
        setSelectedFirstName('');
    };

    const checkQtyState = (e) => {
        if (e) {
            setTriggerQtyError(false);
        } else if (!e) {
            setTriggerQtyError(true);
        };
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

    useEffect(() => {
        const verifyRefill = VERIFY_NUMBER.test(refill);
        setVerifyRefill(verifyRefill);
    }, [refill])





    return (
        <>
            <Alert className='d-flex justify-content-center' color='success' isOpen={openSuccess}>
                Prescription saved successfully!
            </Alert>
            <div className='createRxContainer'>

                <div className='createRxLeftSideContainer'>
                    <div className='uploadedRxContainer'>
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




                <div className='createRxRightSideContainer'>
                    {triggerQtyError
                        ? (
                            <div className='createRxErrMsgContainer'>
                                <img src={RedAlert} alt='Alert symbol' />
                                <h4>Quantity must be a number.</h4>
                            </div>
                        ) : ('')
                    }
                    <h1>Create Rx:</h1>
                    <form className='createRxForm'>
                        <div className='drugInputBoxContainer'>
                            <input
                                name='drug'
                                type='text'
                                onChange={(e) => setDrugName(e.target.value)}
                                required
                            />
                            <span class='drugLabel'>Drug</span>
                        </div>

                        <div className='directionInputBoxContainer'>
                            <input
                                name='direction'
                                type='text'
                                onChange={(e) => setDirection(e.target.value)}
                                required
                            />
                            <span class='directionInputLabel'>Direction</span>
                        </div>

                        <div className='qtyRefillDaySupplyContainer'>
                            <div className={!triggerQtyError ? 'qtyInputContainer' : 'qtyInputErrorContainer'}>
                                <input
                                    name='quanity'
                                    type='text'
                                    onChange={(e) => setQty(e.target.value)}
                                    onBlur={() => checkQtyState(verifyQty)}
                                    required
                                />
                                <span class={!triggerQtyError ? 'qtyLabel' : 'qtyErrorLabel'}>Quantity</span>
                            </div>
                            <div className='refillInputContainer'>
                                <input
                                    name='refills'
                                    type='text'
                                    onChange={(e) => setRefill(e.target.value)}
                                    required
                                />
                                <span class='refillLabel'>Refills</span>
                            </div>
                            <div className='daySupplyInputContainer'>
                                <input
                                    name='daySupply'
                                    type='text'
                                    onChange={(e) => setDaySupply(e.target.value)}
                                    required
                                />
                                <span class='daySupplyLabel'>Day Supply</span>
                            </div>
                        </div>
                        <button className='createRxSubmitButton' type='submit' outline>Submit</button>
                    </form >

                    <div className='createRxInstruction'>
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
        </>
    )
};

export default CreateRx;