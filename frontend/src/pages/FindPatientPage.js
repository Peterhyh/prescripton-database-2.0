import ProfileSearchTable from '../components/findPatient/ProfileSearchTable';
import DrugTable from '../components/findPatient/DrugTable';
import './css/FindPatient.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DownArrow from '../app/assets/img/downArrow.svg';
import RightArrow from '../app/assets/img/rightArrow.svg';

import { useDispatch } from 'react-redux';
import { addToList } from '../slice/drugListSlice';
import { addToPatientList } from '../slice/patientSlice';

const FindPatientPage = () => {
    const [query, setQuery] = useState();
    const [selectedId, setSelectedId] = useState();

    const [patientFirstName, setPatientFirstName] = useState();
    const [patientLastName, setPatientLastName] = useState();
    const [patientDob, setPatientDob] = useState();
    const [patientAddress, setPatientAddress] = useState();

    const [showInfo, setShowInfo] = useState(false);
    const [showDrugList, setShowDrugList] = useState(false);

    const handleTabState = () => {
        setShowInfo(true);
        setShowDrugList(false);
    };

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
                    <label htmlFor='patientName'>{'Patient Name (Last, First):'}</label>
                    <input
                        placeholder='example: "Smoe, Joe"'
                        id='patientName'
                        type='text'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <ProfileSearchTable
                        handleTabState={handleTabState}
                        query={query}
                        setSelectedId={setSelectedId}
                        setPatientFirstName={setPatientFirstName}
                        setPatientLastName={setPatientLastName}
                        setPatientDob={setPatientDob}
                        setPatientAddress={setPatientAddress}
                    />
                    <div className='dataEntryInstruction'>
                        <div>
                            <h1>Step 4:</h1>
                            <ul>
                                <li>
                                    Please enter the patient name that you are looking for and click on their profile<br /><br />
                                </li>
                                <li>
                                    If you have entered the patient's medication previously, you should be able to find the medication's name under the prescription tab.
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div className={selectedId ? 'profile-container' : 'hide'}>
                <div className='selected-patient-back-button-container'>
                    <button onClick={() => setSelectedId(false)}>Back to Search</button>
                </div>
                <div className='selected-patient-header'>
                    <h1>{`${patientLastName}, ${patientFirstName}`}</h1>
                </div>

                <div className='selected-patient-info'>
                    <div className='selected-patient-info-header' onClick={() => setShowInfo(!showInfo)}>
                        <img className={showInfo ? 'hide' : ''} src={RightArrow} alt='' />
                        <img className={showInfo ? '' : 'hide'} src={DownArrow} alt='' />
                        <h5>INFO</h5>
                    </div>
                    <div className={showInfo ? '' : 'hide'}>
                        <p>DATE OF BIRTH:{'  '}{patientDob}</p>
                        <p>ADDRESS:{'  '}{patientAddress}</p>
                    </div>
                </div>

                <DrugTable
                    setShowDrugList={setShowDrugList}
                    showDrugList={showDrugList}
                />

            </div>
        </>
    )
};

export default FindPatientPage;