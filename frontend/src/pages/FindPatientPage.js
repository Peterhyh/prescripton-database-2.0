import ProfileSearchTable from '../components/findPatient/ProfileSearchTable';
import DrugTable from '../components/findPatient/DrugTable';
import './css/FindPatient.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DownArrow from '../app/assets/img/downArrow.svg';
import RightArrow from '../app/assets/img/rightArrow.svg';

import { useDispatch } from 'react-redux';
import { addToList } from '../slice/prescriptionListSlice';
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

    const [searchedName, setSearchedName] = useState('');

    const handleTabState = () => {
        setShowInfo(true);
        setShowDrugList(false);
    };

    const dispatch = useDispatch();


    useEffect(() => {
        axios.get('http://18.212.66.103:8000/newPatient')
            .then(json => {
                dispatch(addToPatientList(json.data));
            })
            .catch(err => console.log(err));
    }, [query]);



    useEffect(() => {
        axios.post(
            'http://18.212.66.103:8000/newRx/data',
            JSON.stringify({ patientId: selectedId }),
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
            .then(response => {
                const responseArray = response.data;
                const prescriptionList = responseArray.map(data => {
                    return data;
                })
                dispatch(addToList(prescriptionList));
            })
            .catch(err => console.log(err));
    }, [selectedId]);


    return (
        <>
            <div className={selectedId ? 'hide' : 'find-patient-container'}>
                <h1>Patient Search</h1>
                <div className='find-patient-searchbar'>
                    <label htmlFor='patientName'>{'Patient Name (Last, First):'}</label>
                    <input
                        placeholder='example: "Smoe, Joe"'
                        id='patientName'
                        value={searchedName}
                        type='text'
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSearchedName(e.target.value);
                        }}
                    />
                    <ProfileSearchTable
                        handleTabState={handleTabState}
                        query={query}
                        setSelectedId={setSelectedId}
                        setPatientFirstName={setPatientFirstName}
                        setPatientLastName={setPatientLastName}
                        setPatientDob={setPatientDob}
                        setPatientAddress={setPatientAddress}
                        setSearchedName={setSearchedName}
                        setQuery={setQuery}
                    />
                    <div className='findPatientInstruction'>
                        <h1>Step 4:</h1>
                        <ul>
                            <li>
                                Please type the patient's name above, a table will appear if the patient exists in the database, and click on the correct profile.<br /><br />
                            </li>
                            <li>
                                If you have entered the patient's medication previously, you should be able to find it
                                under the patient's prescription tab.<br /><br />
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className={selectedId ? 'profile-container' : 'hide'}>
                <h1>Selected Profile</h1>
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

                    <div className='drug-table-header-carot' onClick={() => setShowDrugList(!showDrugList)}>
                        <img className={showDrugList ? '' : 'hide'} src={RightArrow} alt='' />
                        <img className={showDrugList ? 'hide' : ''} src={DownArrow} alt='' />
                        <h5>PRESCRIPTION</h5>
                    </div>
                    <DrugTable
                        setShowDrugList={setShowDrugList}
                        showDrugList={showDrugList}
                    />
                </div>
            </div>
        </>
    )
};

export default FindPatientPage;