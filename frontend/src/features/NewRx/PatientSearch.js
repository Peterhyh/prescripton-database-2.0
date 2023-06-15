import SearchTable from './SearchTable';
import './css/PatientSearch.css';
import NewPatient from './NewPatient';
import { useState, useContext } from 'react';
import { newRxContext } from '../../context/NewRxContext';

const PatientSearch = () => {

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

    const handleCreateRx = () => {
        setOpenDataEntry(!openDataEntry);
        setOpenSelectPatient(false);
        setOpenUploadRx(false);
    };

    const search = (value) => {
        return value.filter(patient => patient.lastName.toLowerCase().includes(query) || patient.firstName.toLowerCase().includes(query) || patient.lastName.toUpperCase().includes(query) || patient.firstName.toUpperCase().includes(query));
    }

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
                            <label htmlFor='patientName'>{'Patient Name (Last, First):'}</label>
                            <input
                                placeholder='example: "Smoe, Joe"'
                                value={patientName}
                                id='patientName'
                                type='text'
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setPatientName(e.target.value);
                                }}
                            />
                        </div>
                        <button className='patientsearch-register-button' onClick={() => toggleNewPatient()}>Register Patient</button>
                    </div>
                    <div className='searchbar-row-bottom'>
                        <SearchTable value={search(value)} handleCreateRx={handleCreateRx} />
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

export default PatientSearch;