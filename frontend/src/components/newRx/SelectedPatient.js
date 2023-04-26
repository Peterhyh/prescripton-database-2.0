

const SelectedPatient = ({ selectedLastName, selectedFirstName, setSelectedLastName, setSelectedFirstName }) => {

    const handleClear = () => {
        setSelectedLastName('');
        setSelectedFirstName('');
    };


    return (
        <>
            <div className='col-sm-7'>
                <h1>Selected Patient:</h1>
                <h2>{`${selectedLastName}, ${selectedFirstName}`}</h2>
            </div>
            <div className='col-sm-3 ml-3'>
                <button className='selectedpatient-clear-button' onClick={handleClear}>Clear</button>
            </div>
        </>


    )
};

export default SelectedPatient;