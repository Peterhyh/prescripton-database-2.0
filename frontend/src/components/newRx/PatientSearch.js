import SearchTable from './SearchTable';
import SelectedPatient from './SelectedPatient';
import './css/PatientSearch.css';
import NewPatient from './NewPatient';
import { useState } from 'react';



const PatientSearch = ({ setQuery, query, value, uploadedRx, selectedLastName, selectedFirstName, setSelectedLastName, setSelectedFirstName, setSelectedId }) => {
    const [openNewPatient, setOpenNewPatient] = useState(false);
    const [openSelectPatient, setSelectPatient] = useState(true);

    const search = (value) => {
        return value.filter(patient => patient.lastName.toLowerCase().includes(query));
    }

    const toggleNewPatient = () => {
        setOpenNewPatient(!openNewPatient);
        setSelectPatient(false);
    };

    return (
        <div className='patientsearch-container'>

            <div className='patientsearch-left'>
                <div>
                    <h1 className='uploaded-rx-title'>Uploaded Rx:</h1>
                    <img src={uploadedRx} alt='Uploaded rx' />
                </div>
                <div className={selectedLastName && selectedFirstName ? 'selectedpatient-container' : 'hide'}>
                    <SelectedPatient
                        selectedLastName={selectedLastName}
                        selectedFirstName={selectedFirstName}
                        setSelectedLastName={setSelectedLastName}
                        setSelectedFirstName={setSelectedFirstName} />
                </div>
            </div>

            <div className='patientsearch-right'>
                <div className={openSelectPatient ? 'searchbar-container' : 'hide'}>
                    <div className='searchbar-row-top'>
                        <h1>Select Patient:</h1>
                    </div>
                    <div className='searchbar-row-middle'>
                        <div className='searchbarContainer'>
                            <label htmlFor='patientName'>{'Patient Name (Last, First):'}</label>
                            <input
                                placeholder='example: "Smoe, Joe"'
                                id='patientName'
                                type='text'
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <button className='patientsearch-register-button' onClick={() => toggleNewPatient()}>Register Patient</button>
                    </div>
                    <div className='searchbar-row-bottom'>

                        <SearchTable
                            value={search(value)}
                            query={query}
                            setSelectedFirstName={setSelectedFirstName}
                            setSelectedLastName={setSelectedLastName}
                            setSelectedId={setSelectedId}
                        />
                    </div>
                </div>
                <NewPatient
                    setSelectPatient={setSelectPatient}
                    openNewPatient={openNewPatient}
                    setOpenNewPatient={setOpenNewPatient}
                    setSelectedLastName={setSelectedLastName}
                    setSelectedFirstName={setSelectedFirstName}
                    setSelectedId={setSelectedId}
                />
                <div className='selectPatientInstruction'>
                    <div>
                        <h1>Step 2:</h1>
                        <ul>
                            <li>
                                Check to see if the patient is already registered in the database using the search bar above.<br /><br />
                            </li>
                            <li>
                                Verify the patient's full name, date of birth, and address in the search result to see if
                                it matches the patient's information on the prescription before clicking it. NOTE: Some
                                patients may have similar names, so the rule of thumb is to always verify the full name
                                and date of birth first and then verify either the full address or phone number to ensure you
                                have the correct patient.<br /><br />
                            </li>
                            <li>
                                Once you have found the patient's profile, click on it, and then you will see the selected name
                                on the bottom left of the screen.<br /><br />
                            </li>
                            <li>
                                Once the patient is selected, you are ready to move onto the next step, data entry. Click "Data Entry" above to proceed.<br /><br />

                            </li>
                            <li>
                                (Optional) If you are unable to find the patient's profile using the search bar above, click the
                                "Register Patient" button, and register the patient before proceeding to data entry.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default PatientSearch;