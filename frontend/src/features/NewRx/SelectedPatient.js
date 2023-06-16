import './css/SelectedPatient.css';
import { useContext } from 'react';
import { newRxContext } from '../../context/NewRxContext';

const SelectedPatient = () => {

    const {
        selectedLastName,
        selectedFirstName,
        setSelectedLastName,
        setSelectedFirstName,
        setOpenDataEntry,
        setOpenSelectPatient,
    } = useContext(newRxContext);

    const handleClearPatient = () => {
        setSelectedLastName('');
        setSelectedFirstName('');
        setOpenDataEntry(false);
        setOpenSelectPatient(true);
    };


    return (
        <div className='selectedpatient-container'>
            <div className='selectedpatient-top-row'>
                <div>
                    <h1>Selected Patient:</h1>
                </div>
            </div>
            <div className='selectedpatient-bottom-row'>
                <div className='selectedpatient-content'>
                    <h2>{`${selectedLastName}, ${selectedFirstName}`}</h2>
                    <button className='selectedpatient-clear-button' onClick={() => handleClearPatient()}>x</button>
                </div>
            </div>
        </div>


    )
};

export default SelectedPatient;