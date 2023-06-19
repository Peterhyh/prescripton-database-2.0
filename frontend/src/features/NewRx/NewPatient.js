import axios from 'axios';
import './css/NewPatient.css';
import { useState, useEffect, useContext } from 'react';
import RedAlert from '../../app/assets/img/redAlert.svg';
import PlacesAutocomplete from '../../services/PlacesAutocomplete.js';
import { useSelector } from 'react-redux';
import { newRxContext } from '../../context/NewRxContext';


const FOUR_DIGITS = /^\d{4,4}$/
const FIVE_DIGITS = /^\d{5,5}$/
const LETTERS_ONLY = /^[a-zA-Z]{1,}$/

const NewPatient = ({ handleCreateRx, openRegisterPatient, setOpenRegisterPatient, setOpenPatientSelection }) => {

    const {
        setSelectedLastName,
        setSelectedFirstName,
        setSelectedId,
        setPatientName,
        openSelectPatient,
        patientName,
    } = useContext(newRxContext);

    const addressStreet = useSelector((state) => state.streetAddress.street);

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
    const [birthMonthMouseOff, setBirthMonthMouseOff] = useState(false);

    const [birthDay, setBirthDay] = useState('');
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
        setFirstNameMouseOff(false);
        setLastNameMouseOff(false);
        setBirthDayMouseOff(false);
        setBirthMonthMouseOff(false);
        setBirthYearMouseOff(false);
        setCityMouseOff(false);
        setStateMouseOff(false);
        setZipMouseOff(false);
        setStreetMouseOff(false);
    };


    const toggleBack = () => {
        setOpenPatientSelection(true);
        setOpenRegisterPatient(false);
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
                        setOpenRegisterPatient(false);
                        setOpenPatientSelection(true);
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
            && birthMonth.length > 0
            && birthDay.length > 0
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
        birthMonth,
        birthDay,
        verifiedBirthYear,
        street,
        city,
        state,
        verifiedZip,
    ]);

    useEffect(() => {
        const splitAddress = addressStreet.split(',');
        setStreet(splitAddress[0]);
        const removeAddressSpaces = addressStreet.replace(/\s/g, '');
        const splitFormattedAddress = removeAddressSpaces.split(',');
        setCity(splitFormattedAddress[1]);
        setState(splitFormattedAddress[2]);
        setZip(splitFormattedAddress[3]);
    }, [addressStreet]);

    useEffect(() => {
        if (street.length < 1) {
            setStateMouseOff(false);
            setZipMouseOff(false);
            setStreetMouseOff(false);
            setCityMouseOff(false);
        }
    }, [street]);

    //CLEAR FORM IF TOGGLED AWAY 
    useEffect(() => {
        if (!openRegisterPatient || !openSelectPatient) {
            handleClearForm();
        };
    }, [openRegisterPatient, openSelectPatient]);

    //CONVERTS SEARCH RESULTS TO APPROPRIATE INPUT FIELDS
    useEffect(() => {
        if (openRegisterPatient) {
            if (patientName.includes(',')) {
                const filterNameSpaces = patientName.replace(/\s+/g, '');
                const splitNameEntered = filterNameSpaces.split(',');
                setLastName(splitNameEntered[0]);
                setFirstName(splitNameEntered[1]);
            } else if (patientName.includes(' ')) {
                const splitNameEntered = patientName.split(' ');
                const filterNameSpaces = splitNameEntered.filter(name => {
                    return name != '';
                })
                setLastName(filterNameSpaces[1]);
                setFirstName(filterNameSpaces[0]);
            } else {
                setLastName(patientName);
            }
        }
    }, [openRegisterPatient]);

    return (
        <div className={openRegisterPatient ? 'registerPatientContainer' : 'hide'}>

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
                {birthMonth.length < 1 && birthMonthMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>"Birth Month" cannot be blank</h4>
                        </div>
                    ) : ('')
                }
                {birthDay.length < 1 && birthDayMouseOff
                    ? (
                        <div className='errMsgContent'>
                            <img src={RedAlert} alt='Alert symbol' />
                            <h4>"Birth Day" cannot be blank</h4>
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
                {state.length < 1 && stateMouseOff
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
                    <div className={birthMonth.length < 1 && birthMonthMouseOff ? 'dobMonthContainerError' : 'dobMonthContainer'}>
                        <select
                            name='dateOfBirthMonth'
                            value={birthMonth}
                            type='text'
                            onChange={(e) => setBirthMonth(e.target.value)}
                            onBlur={() => setBirthMonthMouseOff(true)}
                            required
                        >
                            <option value=''></option>
                            <option value='01'>01</option>
                            <option value='02'>02</option>
                            <option value='03'>03</option>
                            <option value='04'>04</option>
                            <option value='05'>05</option>
                            <option value='06'>06</option>
                            <option value='07'>07</option>
                            <option value='08'>08</option>
                            <option value='09'>09</option>
                            <option value='10'>10</option>
                            <option value='11'>11</option>
                            <option value='12'>12</option>
                        </select>
                        <span>Birth Month</span>
                    </div>
                    <div className={birthDay.length < 1 && birthDayMouseOff ? 'dobDayContainerError' : 'dobDayContainer'}>
                        <select
                            name='dateOfBirthDay'
                            value={birthDay}
                            type='text'
                            onChange={(e) => setBirthDay(e.target.value)}
                            onBlur={() => setBirthDayMouseOff(true)}
                            required
                        >
                            <option value=''></option>
                            <option value='01'>01</option>
                            <option value='02'>02</option>
                            <option value='03'>03</option>
                            <option value='04'>04</option>
                            <option value='05'>05</option>
                            <option value='06'>06</option>
                            <option value='07'>07</option>
                            <option value='08'>08</option>
                            <option value='09'>09</option>
                            <option value='10'>10</option>
                            <option value='11'>11</option>
                            <option value='12'>12</option>
                            <option value='13'>13</option>
                            <option value='14'>14</option>
                            <option value='15'>15</option>
                            <option value='16'>16</option>
                            <option value='17'>17</option>
                            <option value='18'>18</option>
                            <option value='19'>19</option>
                            <option value='20'>20</option>
                            <option value='21'>21</option>
                            <option value='22'>22</option>
                            <option value='23'>23</option>
                            <option value='24'>24</option>
                            <option value='25'>25</option>
                            <option value='26'>26</option>
                            <option value='27'>27</option>
                            <option value='28'>28</option>
                            <option value='29'>29</option>
                            <option value='30'>30</option>
                            <option value='31'>31</option>
                        </select>
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




                <PlacesAutocomplete street={street} />
                <div className={street.length > 0 ? '' : 'hide'}>
                    <div className={street.length < 1 && streetMouseOff ? 'streetContainerError' : 'streetContainer'}>
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

                        <div className={state.length < 1 && stateMouseOff ? 'stateContainerError' : 'stateContainer'}>
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
            <div>

            </div>
        </div>
    )
};

export default NewPatient;