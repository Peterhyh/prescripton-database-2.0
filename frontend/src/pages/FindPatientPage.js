import SearchTable from '../components/findPatient/SearchTable';
import DrugTable from '../components/findPatient/DrugTable';
import './css/FindPatient.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const FindPatientPage = () => {
    const [query, setQuery] = useState();
    const [value, setValue] = useState([]);
    const [selectedId, setSelectedId] = useState();

    const [patientFirstName, setPatientFirstName] = useState();
    const [patientLastName, setPatientLastName] = useState();


    useEffect(() => {
        axios.get('http://localhost:3001/newPatient')
            .then(json => {
                setValue(json.data);
            })
            .catch(err => console.log(err));
    }, [query]);

    const handleSelection = () => {
        axios.post(
            'http://localhost:3001/newRx/data',
            JSON.stringify({ patientId: selectedId }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                console.log(response);
            })
            .catch(err => console.log(err));
    };


    return (
        <>
            <div className={selectedId ? 'hide' : 'find-patient-container'}>
                <div className='find-patient-searchbar'>
                    <input
                        placeholder='Last, First'
                        type='text'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <SearchTable
                        query={query}
                        value={value}
                        setSelectedId={setSelectedId}
                        setPatientFirstName={setPatientFirstName}
                        setPatientLastName={setPatientLastName}
                        handleSelection={handleSelection}
                    />

                </div>
            </div>
            <div className={selectedId ? 'profile-container' : 'hide'}>
                <h1>{`${patientLastName}, ${patientFirstName}`}</h1>
                <DrugTable
                />
            </div>
        </>
    )
};

export default FindPatientPage;