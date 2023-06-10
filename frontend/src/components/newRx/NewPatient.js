import axios from 'axios';
import './css/NewPatient.css';
import { useState, useEffect } from 'react';
import RedAlert from '../../app/assets/img/redAlert.svg';

const TWO_DIGITS = /^\d{2,2}$/
const FOUR_DIGITS = /^\d{4,4}$/
const FIVE_DIGITS = /^\d{5,5}$/
const LETTERS_ONLY = /^[a-zA-Z]{1,}$/

const NewPatient = ({ openNewPatient, setOpenNewPatient, setSelectPatient, setSelectedLastName, setSelectedFirstName, setSelectedId, handleCreateRx, setPatientName }) => {

    const [toggleFormButton, setToggleFormButton] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [firstNameMouseOff, setFirstNameMouseOff] = useState(false);
    const [verifiedFirstName, setVerifiedFirstName] = useState(false);

    const [lastName, setLastName] = useState('');
    const [lastNameMouseOff, setLastNameMouseOff] = useState(false);
    const [verifiedLastName, setVerifiedLastName] = useState(false);

    const [street, setStreet] = useState('');
    const [streetMouseOff, setStreetMouseOff] = useState(false);

    const [city, setCity] = useState('');
    const [cityMouseOff, setCityMouseOff] = useState(false);
    const [verifiedCity, setVerifiedCity] = useState(false);

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

    const handleClearForm = () => {
        setFirstName('');
        setLastName('');
        setStreet('');
        setCity('');
        setState('');
        setBirthMonth('');
        setBirthDay('');
        setBirthYear('');
        setZip('');
        setPatientName('');
    };


    const toggleBack = () => {
        setSelectPatient(true);
        setOpenNewPatient(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(
                'http://18.212.66.103:8000/newPatient',
                JSON.stringify({
                    firstName: firstName.toUpperCase(),
                    lastName: lastName.toUpperCase(),
                    dateOfBirthMonth: birthMonth,
                    dateOfBirthDay: birthDay,
                    dateOfBirthYear: birthYear,
                    street: street.toUpperCase(),
                    city: city.toUpperCase(),
                    state: state.toUpperCase(),
                    zip: zip,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
                .then((response) => {
                    if (response.status === 200) {
                        setSelectedLastName(response.data.lastName);
                        setSelectedFirstName(response.data.firstName);
                        setSelectedId(response.data._id);
                        setOpenNewPatient(false);
                        setSelectPatient(true);
                        handleClearForm();
                        handleCreateRx();
                    }
                })
                .catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        const verifyBirthMonth = TWO_DIGITS.test(birthMonth);
        const verifyBirthDay = TWO_DIGITS.test(birthDay);
        setVerifiedBirthMonth(verifyBirthMonth);
        setVerifiedBirthDay(verifyBirthDay);
    }, [birthMonth, birthDay]);

    useEffect(() => {
        const verifyBirthYear = FOUR_DIGITS.test(birthYear);
        setVerifiedBirthYear(verifyBirthYear);
    }, [birthYear]);

    useEffect(() => {
        const verifyZip = FIVE_DIGITS.test(zip);
        setVerifiedZip(verifyZip);
    }, [zip]);

    useEffect(() => {
        const verifyFirstName = LETTERS_ONLY.test(firstName);
        const verifyLastName = LETTERS_ONLY.test(lastName);
        const verifyCity = LETTERS_ONLY.test(city);
        setVerifiedFirstName(verifyFirstName);
        setVerifiedLastName(verifyLastName);
        setVerifiedCity(verifyCity);
    }, [firstName, lastName, city]);

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
                {!verifiedFirstName && firstNameMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>"First Name" cannot be blank and must contain only letters</h4>
                        </div>
                    ) : ('')
                }
                {!verifiedLastName && lastNameMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>"Last Name" cannot be blank and must contain only letters</h4>
                        </div>
                    ) : ('')
                }
                {!verifiedBirthMonth && birthMonthMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>"Birth Month" must be a number with 2 digits</h4>
                        </div>
                    ) : ('')
                }
                {!verifiedBirthDay && birthDayMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>"Birth Day" must be a number with 2 digits</h4>
                        </div>
                    ) : ('')
                }
                {!verifiedBirthYear && birthYearMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>"Birth Year" must be a number with 4 digits</h4>
                        </div>
                    ) : ('')
                }
                {!street.length > 0 && streetMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>"Street" cannot be blank</h4>
                        </div>
                    ) : ('')
                }
                {!verifiedCity && cityMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>"City" cannot be blank and must contain only letters</h4>
                        </div>
                    ) : ('')
                }
                {state.length === 0 && stateMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>Please select a state</h4>
                        </div>
                    ) : ('')
                }
                {!verifiedZip && zipMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>"Zip" must be a number with 5 digits</h4>
                        </div>
                    ) : ('')}
            </div>

            <form onSubmit={handleSubmit}>

                <h1 class='patient-title'>New Patient:</h1>

                <div className='nameContainer'>
                    <div className={!verifiedFirstName && firstNameMouseOff ? 'firstNameContainerError' : 'firstNameContainer'}>
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
                    <div className={!verifiedLastName && lastNameMouseOff ? 'lastNameContainerError' : 'lastNameContainer'}>
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
                    <div className={!verifiedCity && cityMouseOff ? 'cityContainerError' : 'cityContainer'}>
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
                        <select
                            id='state'
                            name='state'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            onBlur={() => setStateMouseOff(true)}
                            required
                        >
                            <option value=''></option>
                            <option value="AL">AL</option>
                            <option value="AK">AK</option>
                            <option value="AZ">AZ</option>
                            <option value="AR">AR</option>
                            <option value="CA">CA</option>
                            <option value="CO">CO</option>
                            <option value="CT">CT</option>
                            <option value="DE">DE</option>
                            <option value="DC">DC</option>
                            <option value="FL">FL</option>
                            <option value="GA">GA</option>
                            <option value="HI">HI</option>
                            <option value="ID">ID</option>
                            <option value="IL">IL</option>
                            <option value="IN">IN</option>
                            <option value="IA">IA</option>
                            <option value="KS">KS</option>
                            <option value="KY">KY</option>
                            <option value="LA">LA</option>
                            <option value="ME">ME</option>
                            <option value="MD">MD</option>
                            <option value="MA">MA</option>
                            <option value="MI">MI</option>
                            <option value="MN">MN</option>
                            <option value="MS">MS</option>
                            <option value="MO">MO</option>
                            <option value="MT">MT</option>
                            <option value="NE">NE</option>
                            <option value="NV">NV</option>
                            <option value="NH">NH</option>
                            <option value="NJ">NJ</option>
                            <option value="NM">NM</option>
                            <option value="NY">NY</option>
                            <option value="NC">NC</option>
                            <option value="ND">ND</option>
                            <option value="OH">OH</option>
                            <option value="OK">OK</option>
                            <option value="OR">OR</option>
                            <option value="PA">PA</option>
                            <option value="RI">RI</option>
                            <option value="SC">SC</option>
                            <option value="SD">SD</option>
                            <option value="TN">TN</option>
                            <option value="TX">TX</option>
                            <option value="UT">UT</option>
                            <option value="VT">VT</option>
                            <option value="VA">VA</option>
                            <option value="WA">WA</option>
                            <option value="WV">WV</option>
                            <option value="WI">WI</option>
                            <option value="WY">WY</option>
                        </select>
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