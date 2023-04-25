import SearchTable from './SearchTable';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const PatientSearch = ({ setQuery, query, value }) => {
    const navigate = useNavigate();

    const [selectedId, setSelectedId] = useState();

    const search = (value) => {
        return value.filter(patient => patient.firstName.toLowerCase().includes(query) || patient.lastName.toLowerCase().includes(query));
    }


    return (
        <>
            <div className='register-patient-section-container'>
                <button onClick={() => navigate('/newPatient')}>Register Patient</button>
            </div>


            <h1 className='new-rx-searchbar-title'>Select Patient:</h1>


            <div className='new-rx-searchbar-container'>
                <div className='new-rx-searchbar-row'>
                    <input
                        placeholder='Last, First'
                        type='text'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <SearchTable value={search(value)} query={query} setSelectedId={setSelectedId} />

                <div className={selectedId ? 'new-rx-selected-patient' : 'hide'}>
                    <p>Selected: {`${selectedId}`}</p>
                    <button onClick={() => setSelectedId('')}>x</button>
                </div>

            </div>
        </>
    )
};

export default PatientSearch;