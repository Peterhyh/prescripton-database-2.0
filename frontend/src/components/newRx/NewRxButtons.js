import './css/NewRxButtons.css';
import RightArrow from '../../app/assets/img/buttonRightArrow.svg';
import CircleWithCheckmark from '../../app/assets/img/checkCircle.svg';

const NewRxButtons = ({ setOpenDataEntry, setOpenSelectPatient, setOpenUploadRx, openSelectPatient, openUploadRx, openDataEntry, selectedFirstName, selectedLastName }) => {

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
            <div className='new-rx-buttons newRxUploadButton'>
                <button onClick={() => handleUploadRx()}>
                    Upload Rx
                    <img className='newRxCompletedCheckmark' src={CircleWithCheckmark} alt='' />
                </button>
            </div>

            <div className='newRxButtonsNextArrow'>
                <img src={RightArrow} alt='' />
            </div>

            <div className={selectedFirstName && selectedFirstName ? 'newRxSelectPatientButton' : 'new-rx-buttons'}>
                <button onClick={() => handleSelectPatient()}>
                    Select Patient
                    <img className={selectedFirstName && selectedFirstName ? 'newRxCompletedCheckmark' : 'hide'} src={CircleWithCheckmark} alt='' />
                </button>

            </div>

            <div className={selectedFirstName && selectedFirstName ? 'newRxButtonsNextArrow' : 'hide'}>
                <img src={RightArrow} alt='' />
            </div>


            <div className='new-rx-buttons newRxCreateRxButton'>
                <button onClick={() => handleDataEntry()}>Create Rx</button>
            </div>
        </div>
    );
};
export default NewRxButtons;