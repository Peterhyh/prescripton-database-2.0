import SearchTable from './SearchTable';
import './css/SelectPatient.css';
import NewPatient from './NewPatient';
import { useState, useContext, useEffect } from 'react';
import { newRxContext } from '../../context/NewRxContext';

const CHECK_COMMA = /^.*[,].*$/
const CHECK_SPACES = /\s/

const SelectPatient = () => {

    const {
        setQuery,
        query,
        value,
        setOpenDataEntry,
        setOpenSelectPatient,
        openSelectPatient,
        setOpenUploadRx,
        openDataEntry,
        patientName,
        setPatientName,
    } = useContext(newRxContext);

    const [openRegisterPatient, setOpenRegisterPatient] = useState(false);
    const [openPatientSelection, setOpenPatientSelection] = useState(true);

    const [searchedFirstName, setSearchedFirstName] = useState('');
    const [searchedLastName, setSearchedLastName] = useState('');

    const handleCreateRx = () => {
        setOpenDataEntry(!openDataEntry);
        setOpenSelectPatient(false);
        setOpenUploadRx(false);
    };

    const checkComma = CHECK_COMMA.test(query);
    const checkSpaces = CHECK_SPACES.test(query);

    useEffect(() => {
        if (checkComma) {
            const removeSpaces = query.replace(/\s/g, '');
            const splitQuery = removeSpaces.split(',');
            const filterWhiteSpaces = splitQuery.filter(name => {
                return name !== '';
            });
            setSearchedLastName(filterWhiteSpaces[0]);
            setSearchedFirstName(filterWhiteSpaces[1]);
        } else if (checkSpaces) {
            const splitQuery = query.split(' ');
            const filterWhiteSpaces = splitQuery.filter(name => {
                return name !== '';
            });
            setSearchedLastName(filterWhiteSpaces[1]);
            setSearchedFirstName(filterWhiteSpaces[0]);
        } else {
            setSearchedLastName(query);
            setSearchedFirstName(query);
        }
    }, [query]);


    const search = (value) => {
        if (checkComma || checkSpaces) {
            return value.filter(patient => patient.lastName.includes(searchedLastName) && patient.firstName.includes(searchedFirstName));
        }
        return value.filter(patient => patient.lastName.includes(searchedLastName) || patient.firstName.includes(searchedFirstName));
    };


    const toggleNewPatient = () => {
        setOpenRegisterPatient(!openRegisterPatient);
        setOpenPatientSelection(false);
    };

    return (
        <div className={openSelectPatient ? 'patientsearch-container' : 'hide'}>
            <div className='patientsearch-right'>
                <div className={openPatientSelection ? 'searchbar-container' : 'hide'}>
                    <div className='searchbar-row-top'>
                        <h1>Select Patient:</h1>
                    </div>
                    <div className='searchbar-row-middle'>
                        <div className='searchbarContainer'>
                            <label htmlFor='patientName'>
                                {'Patient Name (Last, First):'}
                            </label>
                            <input
                                placeholder='example: "Smoe, Joe"'
                                value={patientName}
                                id='patientName'
                                type='text'
                                onChange={(e) => {
                                    setQuery(e.target.value.toUpperCase());
                                    setPatientName(e.target.value);
                                }}
                            />
                        </div>
                        <button className='patientsearch-register-button' onClick={() => toggleNewPatient()}>Register Patient</button>
                    </div>
                    <div className='searchbar-row-bottom'>
                        <SearchTable value={search(value)} handleCreateRx={handleCreateRx} searchedFirstName={searchedFirstName} searchedLastName={searchedLastName} />
                    </div>
                </div>
                <NewPatient handleCreateRx={handleCreateRx} openRegisterPatient={openRegisterPatient} setOpenRegisterPatient={setOpenRegisterPatient} setOpenPatientSelection={setOpenPatientSelection} />
                <div className='selectPatientInstruction'>
                    <div>
                        <h1>Step 2:</h1>
                        <ul>
                            <li>
                                Check to see if the patient is already registered in the database using the search bar above.<br /><br />
                            </li>
                            <li>
                                Verify the patient's full name, date of birth, and address in the search result to determine if
                                it matches the patient's information on the prescription before clicking it. NOTE: Some
                                patients may have similar names, so the rule of thumb is to always verify the full name
                                and date of birth first and then verify either the full address or phone number to ensure you
                                have the correct patient.<br /><br />
                            </li>
                            <li>
                                Once you have matched the patient, click on it. You will then be automatically directed to step
                                3, "Create Rx".<br /><br />
                            </li>
                            <li>
                                (Optional) If you are unable to find the patient's profile using the search bar above, click the
                                'Register Patient' button, and register the patient. After you have registered the patient, you
                                will be automatically directed to step 3.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SelectPatient;