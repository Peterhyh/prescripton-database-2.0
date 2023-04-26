

const SelectedPatient = ({ selectedLastName, selectedFirstName, setSelectedLastName, setSelectedFirstName }) => {

    const handleClear = () => {
        setSelectedLastName('');
        setSelectedFirstName('');
    };


    return (
        <div className={selectedLastName && selectedFirstName ? 'new-rx-selected-patient' : 'hide'}>
            <div className='col-sm-7'>
                <h1>Selected Patient:</h1>
                <h2>{`${selectedLastName}, ${selectedFirstName}`}</h2>
            </div>
            <div className='col-sm-3 ml-3'>
                <button onClick={handleClear}>Clear</button>
            </div>
        </div>

    )
};

export default SelectedPatient;