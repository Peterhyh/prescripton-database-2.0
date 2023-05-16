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
            </div>
        </div>
    )
};

export default PatientSearch;