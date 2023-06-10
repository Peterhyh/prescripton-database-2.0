import { Alert } from 'reactstrap';
import SelectedPatient from './SelectedPatient';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toggleOn, toggleOff } from '../../slice/toggleActiveCreateRxSlice';
import { useDispatch } from 'react-redux';
import RedAlert from '../../app/assets/img/redAlert.svg';
import './css/CreateRx.css';


const VERIFY_NUMBER = /^\d+$/

const CreateRx = ({ uploadedRx, selectedLastName, selectedFirstName, setSelectedLastName, setSelectedFirstName, selectedId, }) => {

    const dispatch = useDispatch();



    //STATES
    const [openSuccess, setOpenSuccess] = useState(false);
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(
                'http://localhost:3001/newRx',
                JSON.stringify({
                    patientId: selectedId,
                    drug: drugName,
                    direction: direction,
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
                    console.log(response.status);
                    handleClear();
                })
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        };
    };

    //SUBMISSION SUCCESS ALERT
    useEffect(() => {
        const successTimer = setTimeout(() => {
            setOpenSuccess(false);

            return () => clearTimeout(successTimer);
        }, 5000)
    }, [openSuccess])

    //QTY, REFILL, AND DAY SUPPLY REGEX CHECK
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
            console.log('on');
        } else {
            dispatch(toggleOff());
            console.log('off');
        }
    }, [
        drugName,
        direction,
        qty,
        refill,
        daySupply,
    ]);




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
                    <div className='errMsgContainer'>
                        {drugName.length == 0 && drugNameMouseOff
                            ? (
                                <div className='errMsgContent'>
                                    <img src={RedAlert} alt='Alert symbol' />
                                    <h4>'Drug' cannot be blank.</h4>
                                </div>
                            ) : ('')
                        }
                        {direction.length == 0 && directionMouseOff
                            ? (
                                <div className='errMsgContent'>
                                    <img src={RedAlert} alt='Alert symbol' />
                                    <h4>'Direction' cannot be blank.</h4>
                                </div>
                            ) : ('')
                        }
                        {!verifiedQty && qtyMouseOff
                            ? (
                                <div className='errMsgContent'>
                                    <img src={RedAlert} alt='Alert symbol' />
                                    <h4>'Quantity' must be a number.</h4>
                                </div>
                            ) : ('')
                        }
                        {!verifiedRefill && refillMouseOff
                            ? (
                                <div className='errMsgContent'>
                                    <img src={RedAlert} alt='Alert symbol' />
                                    <h4>'Refill' must be a number.</h4>
                                </div>
                            ) : ('')
                        }
                        {!verifiedDaySupply && daySupplyMouseOff
                            ? (
                                <div className='errMsgContent'>
                                    <img src={RedAlert} alt='Alert symbol' />
                                    <h4>'Day Supply' must be a number.</h4>
                                </div>
                            ) : ('')
                        }
                    </div>
                    <h1>Create Rx:</h1>
                    <form className='createRxForm' onSubmit={handleSubmit}>
                        <div className={drugName.length == 0 && drugNameMouseOff ? 'drugInputBoxErrorContainer' : 'drugInputBoxContainer'}>
                            <input
                                name='drug'
                                type='text'
                                onChange={(e) => setDrugName(e.target.value)}
                                onBlur={() => setDrugNameMouseOff(true)}
                                required
                            />
                            <span className={drugName.length == 0 && drugNameMouseOff ? 'drugErrorLabel' : 'drugLabel'}>Drug</span>
                        </div>

                        <div className={direction.length == 0 && directionMouseOff ? 'directionInputBoxErrorContainer' : 'directionInputBoxContainer'}>
                            <input
                                name='direction'
                                type='text'
                                onChange={(e) => setDirection(e.target.value)}
                                onBlur={() => setDirectionMouseOff(true)}
                                required
                            />
                            <span className={direction.length == 0 && directionMouseOff ? 'directionErrorLabel' : 'directionLabel'}>Direction</span>
                        </div>

                        <div className='qtyRefillDaySupplyContainer'>
                            <div className={!verifiedQty && qtyMouseOff ? 'qtyInputErrorContainer' : 'qtyInputContainer'}>
                                <input
                                    name='quanity'
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
                                    <button className='createRxSubmitButtonInactive' type='button' outline>Submit</button>
                                )
                        }

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

                </div >
            </div >
        </>
    )
};

export default CreateRx;