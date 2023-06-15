import './css/NewRxButtons.css';
import RightArrow from '../../app/assets/img/buttonRightArrow.svg';
import CircleWithCheckmark from '../../app/assets/img/checkCircle.svg';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { newRxButtonsContext } from '../../context/NewRxContext';

const NewRxButtons = () => {

    const {
        setOpenDataEntry,
        setOpenSelectPatient,
        setOpenUploadRx,
        selectedFirstName,
        selectedLastName
    } = useContext(newRxButtonsContext);

    const toggleCreateRx = useSelector((state) => state.toggleActiveCreateRx.toggle);

    const handleSelectPatient = () => {
        setOpenSelectPatient(true);
        setOpenUploadRx(false);
        setOpenDataEntry(false);
    };

    const handleUploadRx = () => {
        setOpenUploadRx(true);
        setOpenDataEntry(false);
        setOpenSelectPatient(false);
    };

    const handleCreateRx = () => {
        setOpenDataEntry(true);
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

            <div className={selectedFirstName && selectedLastName ? 'newRxSelectPatientButton' : 'new-rx-buttons'}>
                <button onClick={() => handleSelectPatient()}>
                    Select Patient
                    <img className={selectedFirstName && selectedLastName ? 'newRxCompletedCheckmark' : 'hide'} src={CircleWithCheckmark} alt='' />
                </button>
            </div>

            <div className={selectedFirstName && selectedLastName ? 'newRxButtonsNextArrow' : 'hide'}>
                <img src={RightArrow} alt='' />
            </div>


            <div className={toggleCreateRx ? 'newRxCreateRxButton' : 'new-rx-buttons'}>
                <button onClick={() => handleCreateRx()}>
                    Create Rx
                    <img className={toggleCreateRx ? 'newRxCompletedCheckmark' : 'hide'} src={CircleWithCheckmark} alt='' />
                </button>
            </div>
        </div>
    );
};
export default NewRxButtons;