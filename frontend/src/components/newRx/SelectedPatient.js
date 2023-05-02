import './css/SelectedPatient.css';

const SelectedPatient = ({ selectedLastName, selectedFirstName, setSelectedLastName, setSelectedFirstName }) => {

    const handleClear = () => {
        setSelectedLastName('');
        setSelectedFirstName('');
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
                    <button className='selectedpatient-clear-button' onClick={handleClear}>x</button>
                </div>
            </div>
        </div>


    )
};

export default SelectedPatient;