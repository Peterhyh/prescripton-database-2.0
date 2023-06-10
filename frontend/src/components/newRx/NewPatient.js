import axios from 'axios';
import './css/NewPatient.css';
import { useState, useEffect } from 'react';
import RedAlert from '../../app/assets/img/redAlert.svg';

const VERIFY_NUMBER = /^\d+$/

const NewPatient = ({ openNewPatient, setOpenNewPatient, setSelectPatient, setSelectedLastName, setSelectedFirstName, setSelectedId, handleCreateRx }) => {

    const [toggleFormButton, setToggleFormButton] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [firstNameMouseOff, setFirstNameMouseOff] = useState(false);

    const [lastName, setLastName] = useState('');
    const [lastNameMouseOff, setLastNameMouseOff] = useState(false);

    const [street, setStreet] = useState('');
    const [streetMouseOff, setStreetMouseOff] = useState(false);

    const [city, setCity] = useState('');
    const [cityMouseOff, setCityMouseOff] = useState(false);

    const [state, setState] = useState('');
    const [stateMouseOff, setStateMouseOff] = useState(false);

    const [birthMonth, setBirthMonth] = useState('');
    const [verifiedBirthMonth, setVerifiedBirthMonth] = useState(false);
    const [birthMonthMouseOff, setBirthMonthMouseOff] = useState(false);

    const [birthDay, setBirthDay] = useState('');
    const [verifiedBirthDay, setVerifiedBirthDay] = useState(false);
    const [birthDayMouseOff, setBirthDayMouseOff] = useState(false);

    const [birthYear, setBirthYear] = useState('');
    const [verifiedBirthYear, setVerifiedBirthYear] = useState(false);
    const [birthYearMouseOff, setBirthYearMouseOff] = useState(false);

    const [zip, setZip] = useState('');
    const [verifiedZip, setVerifiedZip] = useState(false);
    const [zipMouseOff, setZipMouseOff] = useState(false);


    const toggleBack = () => {
        setSelectPatient(true);
        setOpenNewPatient(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(
                'http://localhost:3001/newPatient',
                JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    birthMonth: birthMonth,
                    birthDay: birthMonth,
                    birthYear: birthYear,
                    street: street,
                    city: city,
                    state: state,
                    zip: zip,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.status);
                    }
                })
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        const verifyBirthMonth = VERIFY_NUMBER.test(birthMonth);
        const verifyBirthDay = VERIFY_NUMBER.test(birthDay);
        const verifyBirthYear = VERIFY_NUMBER.test(birthYear);
        const verifyZip = VERIFY_NUMBER.test(zip);
        setVerifiedBirthMonth(verifyBirthMonth);
        setVerifiedBirthDay(verifyBirthDay);
        setVerifiedBirthYear(verifyBirthYear);
        setVerifiedZip(verifyZip)
    }, [birthMonth, birthDay, birthYear, zip]);

    //TOGGLE REGISTER PATIENT BUTTON
    useEffect(() => {
        if (
            firstName.length > 0
            && lastName.length > 0
            && verifiedBirthMonth
            && verifiedBirthDay
            && verifiedBirthYear
            && street.length > 0
            && city.length > 0
            && state.length > 0
            && verifiedZip
        ) {
            setToggleFormButton(true);
        } else {
            setToggleFormButton(false);
        }
    }, [
        firstName,
        lastName,
        verifiedBirthMonth,
        verifiedBirthDay,
        verifiedBirthYear,
        street,
        city,
        state,
        verifiedZip,
    ]);



    return (
        <div className={openNewPatient ? 'registerPatientContainer' : 'hide'}>

            <div className='errMsgContainer'>
                {!firstName.length > 0 && firstNameMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>First name cannot be empty.</h4>
                        </div>
                    ) : ('')
                }
                {!lastName.length > 0 && lastNameMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>Last name cannot be empty.</h4>
                        </div>
                    ) : ('')
                }
                {!verifiedBirthMonth && birthMonthMouseOff || !verifiedBirthDay && birthDayMouseOff || !verifiedBirthYear && birthYearMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>Date of birth fields must be a number.</h4>
                        </div>
                    ) : ('')
                }
                {!street.length > 0 && streetMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>Street address cannot be blank.</h4>
                        </div>
                    ) : ('')
                }
                {!city.length > 0 && cityMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>City cannot be blank.</h4>
                        </div>
                    ) : ('')
                }
                {!state.length > 0 && stateMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>State cannot be blank.</h4>
                        </div>
                    ) : ('')
                }
                {!verifiedZip && zipMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>Zip must be a number.</h4>
                        </div>
                    ) : ('')}
            </div>

            <form onSubmit={handleSubmit}>

                <h1 class='patient-title'>New Patient:</h1>

                <div className='nameContainer'>
                    <div className={firstName.length === 0 && firstNameMouseOff ? 'firstNameContainerError' : 'firstNameContainer'}>
                        <input
                            name='firstName'
                            value={firstName}
                            type='text'
                            onChange={(e) => setFirstName(e.target.value)}
                            onBlur={() => setFirstNameMouseOff(true)}
                            required
                        />
                        <span>First Name</span>
                    </div>
                    <div className={lastName.length === 0 && lastNameMouseOff ? 'lastNameContainerError' : 'lastNameContainer'}>
                        <input
                            name='lastName'
                            value={lastName}
                            type='text'
                            onChange={(e) => setLastName(e.target.value)}
                            onBlur={() => setLastNameMouseOff(true)}
                            required
                        />
                        <span>Last Name</span>
                    </div>
                </div>







                <div className='dobContainer'>
                    <div className={!verifiedBirthMonth && birthMonthMouseOff ? 'dobMonthContainerError' : 'dobMonthContainer'}>
                        <input
                            name='dateOfBirthMonth'
                            value={birthMonth}
                            type='text'
                            onChange={(e) => setBirthMonth(e.target.value)}
                            onBlur={() => setBirthMonthMouseOff(true)}
                            required
                        />
                        <span>Birth Month</span>
                    </div>
                    <div className={!verifiedBirthDay && birthDayMouseOff ? 'dobDayContainerError' : 'dobDayContainer'}>
                        <input
                            name='dateOfBirthDay'
                            value={birthDay}
                            type='text'
                            onChange={(e) => setBirthDay(e.target.value)}
                            onBlur={() => setBirthDayMouseOff(true)}
                            required
                        />
                        <span>Birth Day</span>
                    </div>
                    <div className={!verifiedBirthYear && birthYearMouseOff ? 'dobYearContainerError' : 'dobYearContainer'}>
                        <input
                            name='dateOfBirthYear'
                            value={birthYear}
                            type='text'
                            onChange={(e) => setBirthYear(e.target.value)}
                            onBlur={() => setBirthYearMouseOff(true)}
                            required
                        />
                        <span>Birth Year</span>
                    </div>
                </div>






                <div className={street.length === 0 && streetMouseOff ? 'streetContainerError' : 'streetContainer'}>
                    <input
                        name='street'
                        value={street}
                        type='text'
                        onChange={(e) => setStreet(e.target.value)}
                        onBlur={() => setStreetMouseOff(true)}
                        required
                    />
                    <span>Street</span>
                </div>







                <div className='cityStateZipContainer'>
                    <div className={city.length === 0 && cityMouseOff ? 'cityContainerError' : 'cityContainer'}>
                        <input
                            name='city'
                            value={city}
                            type='text'
                            onChange={(e) => setCity(e.target.value)}
                            onBlur={() => setCityMouseOff(true)}
                            required
                        />
                        <span>City</span>
                    </div>

                    <div className={state.length === 0 && stateMouseOff ? 'stateContainerError' : 'stateContainer'}>
                        <input
                            id='state'
                            name='state'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            onBlur={() => setStateMouseOff(true)}
                            required
                        />
                        <span>State</span>
                    </div>

                    <div className={!verifiedZip && zipMouseOff ? 'zipContainerError' : 'zipContainer'}>
                        <input
                            name='zip'
                            value={zip}
                            type='text'
                            onChange={(e) => setZip(e.target.value)}
                            onBlur={() => setZipMouseOff(true)}
                            required
                        />
                        <span>Zip</span>
                    </div>
                </div>
                {
                    toggleFormButton
                        ? (
                            <button className='registerPatientSubmitButtonActive' type='submit' outline>Submit</button>
                        ) : (
                            <i className='registerPatientSubmitButtonInactive' outline>Submit</i>
                        )
                }
            </form>
            <button className='registerPatientBackButton' onClick={() => toggleBack()}>Back</button>
        </div>

    )
};

export default NewPatient;