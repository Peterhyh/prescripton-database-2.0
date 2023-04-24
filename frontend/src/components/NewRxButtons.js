import { useState } from 'react';
import SearchTable from './SearchTable';
import DataEntry from '../components/newRx/DataEntry';




const NewRxButtons = ({ value, query, setQuery, openSuccess, setOpenSuccess, openError, setOpenError }) => {

    const [openSelectPatient, setOpenSelectPatient] = useState(false);
    const [openUploadRx, setOpenUploadRx] = useState(false);
    const [openDataEntry, setOpenDataEntry] = useState(false);

    const handleSelectPatient = () => {
        setOpenSelectPatient(!openSelectPatient);
        setOpenUploadRx(false);
        setOpenDataEntry(false);
    };

    const handleUploadRx = () => {
        setOpenUploadRx(!openUploadRx);
        setOpenDataEntry(false);
        setOpenSelectPatient(false);
    };

    const handleDataEntry = () => {
        setOpenDataEntry(!openDataEntry);
        setOpenSelectPatient(false);
        setOpenUploadRx(false);
    };

    const search = (value) => {
        return value.filter(patient => patient.firstName.toLowerCase().includes(query) || patient.lastName.toLowerCase().includes(query));
    }

    return (
        <>
            <div className='new-rx-buttons-container'>
                <div className='new-rx-buttons-row'>
                    <div className='new-rx-buttons-col'>
                        <button onClick={() => handleSelectPatient()}>Step 1: Select Patient</button>
                    </div>
                    <div className='new-rx-buttons-col'>
                        <button onClick={() => handleUploadRx()}>Step 2: Upload Rx </button>
                    </div>
                    <div className='new-rx-buttons-col'>
                        <button onClick={() => handleDataEntry()}>Step3: Data Entry</button>
                    </div>
                </div>
            </div>

            <div className={openSelectPatient ? 'select-patient-container' : 'hide'}>
                <h3 className='newrx-searchbar-title'>Select Patient:</h3>
                <div className='newrx-searchbar-container'>
                    <div className='newrx-searchbar-row'>
                        <input
                            placeholder='Last, First'
                            type='text'
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <SearchTable value={search(value)} query={query} />
                </div>
            </div>


            <div className={openUploadRx ? 'upload-rx-container' : 'hide'}>
                <h1>Upload Rx</h1>
                <input type='file' id='rx' />
            </div>


            <div className={openDataEntry ? 'data-entry-container' : 'hide'}>
                <DataEntry openSuccess={openSuccess} setOpenSuccess={setOpenSuccess} openError={openError} setOpenError={setOpenError} />
            </div>
        </>
    );
};
export default NewRxButtons;