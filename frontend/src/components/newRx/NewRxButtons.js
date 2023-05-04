import './css/NewRxButtons.css';

const NewRxButtons = ({ setOpenDataEntry, setOpenSelectPatient, setOpenUploadRx, openSelectPatient, openUploadRx, openDataEntry }) => {

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

    return (
        <div className='new-rx-buttons-container'>
            <div className='new-rx-buttons-row'>
                <div className='new-rx-buttons-col'>
                    <button onClick={() => handleUploadRx()}>Step 1: Upload Rx </button>
                </div>
                <div className='new-rx-buttons-col'>
                    <button onClick={() => handleSelectPatient()}>Step 2: Select Patient</button>
                </div>
                <div className='new-rx-buttons-col'>
                    <button onClick={() => handleDataEntry()}>Step 3: Data Entry</button>
                </div>
            </div>
        </div>
    );
};
export default NewRxButtons;