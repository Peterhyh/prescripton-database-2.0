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
            <div className='new-rx-buttons'>
                <button onClick={() => handleUploadRx()}>Upload Rx </button>
            </div>
            <div className='new-rx-buttons'>
                <button onClick={() => handleSelectPatient()}>Select Patient</button>
            </div>
            <div className='new-rx-buttons'>
                <button onClick={() => handleDataEntry()}>Data Entry</button>
            </div>
        </div>
    );
};
export default NewRxButtons;