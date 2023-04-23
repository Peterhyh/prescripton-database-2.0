import { useState } from 'react';
import SearchTable from './SearchTable';




const NewRxButtons = ({ value, query, setQuery }) => {

    const [openSelectPatient, setOpenSelectPatient] = useState(false);
    const [openUploadRx, setOpenUploadRx] = useState(false);

    const handleSelectPatient = () => {
        setOpenSelectPatient(!openSelectPatient);
    };

    const handleUploadRx = () => {
        setOpenUploadRx(!openUploadRx);
    };

    const search = (value) => {
        return value.filter(patient => patient.firstName.toLowerCase().includes(query) || patient.lastName.toLowerCase().includes(query));
    }

    return (
        <>
            <div className='select-patient-button-container'>
                <button onClick={() => handleSelectPatient()}>Step 1: Select Patient</button>
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



            <div className='upload-rx-button-container'>
                <button onClick={() => handleUploadRx()}>Step 2: Upload Rx </button>
            </div>

            <div className={openUploadRx ? 'upload-rx-container' : 'hide'}>
                <label htmlFor='rx'>Upload Rx</label>
                <input type='file' id='rx' />
            </div>
        </>
    );
};
export default NewRxButtons;