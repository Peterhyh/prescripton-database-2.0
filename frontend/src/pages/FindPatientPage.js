import SearchTable from '../components/findPatient/SearchTable';
import DrugTable from '../components/findPatient/DrugTable';
import './css/FindPatient.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { addToList } from '../slice/drugListSlice';
import { addToPatientList } from '../slice/patientSlice';

const FindPatientPage = () => {
    const [query, setQuery] = useState();
    const [selectedId, setSelectedId] = useState();

    const [patientFirstName, setPatientFirstName] = useState();
    const [patientLastName, setPatientLastName] = useState();

    const dispatch = useDispatch();


    useEffect(() => {
        axios.get('http://localhost:3001/newPatient')
            .then(json => {
                dispatch(addToPatientList(json.data));
            })
            .catch(err => console.log(err));
    }, [query]);



    useEffect(() => {
        axios.post(
            'http://localhost:3001/newRx/data',
            JSON.stringify({ patientId: selectedId }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {

                const responseArray = response.data;
                const drugList = responseArray.map(data => {
                    return data.drug;
                })
                dispatch(addToList(drugList));
            })
            .catch(err => console.log(err));
    }, [selectedId]);


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
                        setSelectedId={setSelectedId}
                        setPatientFirstName={setPatientFirstName}
                        setPatientLastName={setPatientLastName}
                    />

                </div>
            </div>
            <div className={selectedId ? 'profile-container' : 'hide'}>
                <h1>{`${patientLastName}, ${patientFirstName}`}</h1>
                <DrugTable />
            </div>
        </>
    )
};

export default FindPatientPage;