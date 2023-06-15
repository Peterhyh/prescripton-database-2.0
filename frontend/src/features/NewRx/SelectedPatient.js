import './css/SelectedPatient.css';

const SelectedPatient = (props) => {

    const handleClearPatient = () => {
        props.setSelectedLastName('');
        props.setSelectedFirstName('');
        props.setOpenDataEntry(false);
        props.setOpenSelectPatient(true);
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
                    <h2>{`${props.selectedLastName}, ${props.selectedFirstName}`}</h2>
                    <button className='selectedpatient-clear-button' onClick={() => handleClearPatient()}>x</button>
                </div>
            </div>
        </div>


    )
};

export default SelectedPatient;