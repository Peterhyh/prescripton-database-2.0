import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { toggleOn, toggleOff } from '../../slice/toggleActiveCreateRxSlice';
import { toggleAlertOn } from '../../slice/toggleAlertSlice';
import { useDispatch } from 'react-redux';
import RedAlert from '../../app/assets/img/redAlert.svg';
import './css/CreateRx.css';
import { newRxContext } from '../../context/NewRxContext';

const VERIFY_NUMBER = /^\d+$/

const CreateRx = () => {

    const {
        selectedId,
        selectedLastName,
        selectedFirstName,
        setSelectedLastName,
        setSelectedFirstName,
        setOpenDataEntry,
        openDataEntry,
        setOpenSelectPatient,
        setOpenUploadRx,
        openUploadRx,
        setPatientName,
    } = useContext(newRxContext);

    const dispatch = useDispatch();

    //STATES
    const [toggleFormButton, setToggleFormButton] = useState(false);

    const [drugName, setDrugName] = useState('');
    const [drugNameMouseOff, setDrugNameMouseOff] = useState(false);

    const [direction, setDirection] = useState('');
    const [directionMouseOff, setDirectionMouseOff] = useState(false);

    const [qty, setQty] = useState('');
    const [verifiedQty, setVerifiedQty] = useState();
    const [qtyMouseOff, setQtyMouseOff] = useState(false);

    const [refill, setRefill] = useState('');
    const [verifiedRefill, setVerifiedRefill] = useState();
    const [refillMouseOff, setRefillMouseOff] = useState(false);

    const [daySupply, setDaySupply] = useState('');
    const [verifiedDaySupply, setVerifiedDaySupply] = useState();
    const [daySupplyMouseOff, setDaySupplyMouseOff] = useState(false);

    //FUNCTIONS
    const handleClear = () => {
        setSelectedLastName('');
        setSelectedFirstName('');
        setDrugName('');
        setDirection('');
        setQty('');
        setRefill('');
        setDaySupply('');
        setDrugNameMouseOff(false);
        setDirectionMouseOff(false);
        setQtyMouseOff(false);
        setRefillMouseOff(false);
        setDaySupplyMouseOff(false);
        setToggleFormButton(false);
        setOpenUploadRx(!openUploadRx);
        setOpenDataEntry(false);
        setOpenSelectPatient(false);
        setPatientName('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(
                'http://localhost:3001/newRx',
                JSON.stringify({
                    patientId: selectedId,
                    drug: drugName.toUpperCase(),
                    direction: direction.toUpperCase(),
                    quanity: qty,
                    refills: refill,
                    daySupply: daySupply,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
                .then((response) => {
                    if (response.status === 200) {
                        handleClear();
                        dispatch(toggleAlertOn());
                    }
                })
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        };
    };

    //REGEX CHECK
    useEffect(() => {
        const verify = VERIFY_NUMBER.test(qty);
        setVerifiedQty(verify);
    }, [qty]);

    useEffect(() => {
        const verify = VERIFY_NUMBER.test(refill);
        setVerifiedRefill(verify);
    }, [refill])

    useEffect(() => {
        const verify = VERIFY_NUMBER.test(daySupply);
        setVerifiedDaySupply(verify);
    }, [daySupply])

    //TOGGLE CREATE RX BUTTON GREEN
    useEffect(() => {
        if (
            drugName.length > 0
            && direction.length > 0
            && verifiedQty
            && verifiedRefill
            && verifiedDaySupply
        ) {
            dispatch(toggleOn());
            setToggleFormButton(true);
        } else {
            dispatch(toggleOff());
            setToggleFormButton(false);
        }
    }, [
        drugName,
        direction,
        verifiedQty,
        verifiedRefill,
        verifiedDaySupply,
    ]);

    return (
        <div className={openDataEntry ? 'createRxContainer' : 'hide'}>
            <div className='createRxRightSideContainer'>
                <div className='errMsgContainer'>
                    {!selectedLastName && !selectedFirstName
                        ? (
                            <div className='errMsgContent'>
                                <img src={RedAlert} alt='Alert symbol' />
                                <h4>Must select a patient</h4>
                            </div>
                        ) : ('')
                    }
                    {drugName.length === 0 && drugNameMouseOff
                        ? (
                            <div className='errMsgContent'>
                                <img src={RedAlert} alt='Alert symbol' />
                                <h4>"Drug" cannot be blank</h4>
                            </div>
                        ) : ('')
                    }
                    {direction.length === 0 && directionMouseOff
                        ? (
                            <div className='errMsgContent'>
                                <img src={RedAlert} alt='Alert symbol' />
                                <h4>"Direction" cannot be blank</h4>
                            </div>
                        ) : ('')
                    }
                    {!verifiedQty && qtyMouseOff
                        ? (
                            <div className='errMsgContent'>
                                <img src={RedAlert} alt='Alert symbol' />
                                <h4>"Quantity" must be a number</h4>
                            </div>
                        ) : ('')
                    }
                    {!verifiedRefill && refillMouseOff
                        ? (
                            <div className='errMsgContent'>
                                <img src={RedAlert} alt='Alert symbol' />
                                <h4>"Refill" must be a number</h4>
                            </div>
                        ) : ('')
                    }
                    {!verifiedDaySupply && daySupplyMouseOff
                        ? (
                            <div className='errMsgContent'>
                                <img src={RedAlert} alt='Alert symbol' />
                                <h4>"Day Supply" must be a number</h4>
                            </div>
                        ) : ('')
                    }
                </div>
                <h1>Create Rx:</h1>
                <form className='createRxForm' onSubmit={handleSubmit}>
                    <div className={drugName.length === 0 && drugNameMouseOff ? 'drugInputBoxErrorContainer' : 'drugInputBoxContainer'}>
                        <input
                            name='drug'
                            value={drugName}
                            type='text'
                            onChange={(e) => setDrugName(e.target.value)}
                            onBlur={() => setDrugNameMouseOff(true)}
                            required
                        />
                        <span className={drugName.length === 0 && drugNameMouseOff ? 'drugErrorLabel' : 'drugLabel'}>Drug</span>
                    </div>

                    <div className={direction.length === 0 && directionMouseOff ? 'directionInputBoxErrorContainer' : 'directionInputBoxContainer'}>
                        <input
                            name='direction'
                            value={direction}
                            type='text'
                            onChange={(e) => setDirection(e.target.value)}
                            onBlur={() => setDirectionMouseOff(true)}
                            required
                        />
                        <span className={direction.length === 0 && directionMouseOff ? 'directionErrorLabel' : 'directionLabel'}>Direction</span>
                    </div>

                    <div className='qtyRefillDaySupplyContainer'>
                        <div className={!verifiedQty && qtyMouseOff ? 'qtyInputErrorContainer' : 'qtyInputContainer'}>
                            <input
                                name='quanity'
                                value={qty}
                                type='text'
                                onChange={(e) => setQty(e.target.value)}
                                onBlur={() => setQtyMouseOff(true)}
                                required
                            />
                            <span className={!verifiedQty && qtyMouseOff ? 'qtyErrorLabel' : 'qtyLabel'}>Quantity</span>
                        </div>
                        <div className={!verifiedRefill && refillMouseOff ? 'refillInputErrorContainer' : 'refillInputContainer'}>
                            <input
                                name='refills'
                                value={refill}
                                type='text'
                                onChange={(e) => setRefill(e.target.value)}
                                onBlur={() => setRefillMouseOff(true)}
                                required
                            />
                            <span className={!verifiedRefill && refillMouseOff ? 'refillErrorLabel' : 'refillLabel'}>Refills</span>
                        </div>
                        <div className={!verifiedDaySupply && daySupplyMouseOff ? 'daySupplyInputErrorContainer' : 'daySupplyInputContainer'}>
                            <input
                                name='daySupply'
                                value={daySupply}
                                type='text'
                                onChange={(e) => setDaySupply(e.target.value)}
                                onBlur={() => setDaySupplyMouseOff(true)}
                                required
                            />
                            <span className={!verifiedDaySupply && daySupplyMouseOff ? 'daySupplyErrorLabel' : 'daySupplyLabel'}>Day Supply</span>
                        </div>
                    </div>
                    {
                        toggleFormButton && selectedLastName && selectedFirstName
                            ? (
                                <button className='createRxSubmitButtonActive' type='submit' outline>Submit</button>
                            ) : (
                                <i className='createRxSubmitButtonInactive' outline>Submit</i>
                            )
                    }

                </form >

                <div className='createRxInstruction'>
                    <h1>Step 3:</h1>
                    <ul>
                        <li>
                            Here we will enter the prescription drug information and save it to the patient's profile.
                            Notice the "Select Patient" button above is now green, indicating that you have completed
                            that step. Also, at the bottom left of the screen, you will see the name you have
                            selected.<br /><br />
                        </li>
                        <li>
                            Enter in the drug name (Amoxicillin 250mg), direction (Take 2 tablets by mouth three times
                            daily for 7 days), quantity (42), refills (0), and the day supply (7).<br /><br />
                        </li>
                        <li>
                            Once you have filled out the form completely, submit it, and then you will be redirected
                            to the "Upload Rx" step. If your submission was successful, a green success message will
                            appear above for 5 seconds.<br /><br />
                        </li>
                        <li>
                            Let's check to see if the medication you submitted was saved in the patient's profile. Click
                            "Patient Search" on the navigation bar above to continue.<br /><br />
                        </li>
                        <li>
                            In a professional setting, sometimes you will see the direction written in sig codes like the
                            example prescription here. Our job is to translate the codes into english or any language the
                            patient chooses. In this demo, we will use english.<br /><br />
                        </li>
                    </ul>
                </div>

            </div >
        </div >
    )
};

export default CreateRx;