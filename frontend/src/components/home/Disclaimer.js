import './css/Disclaimer.css';

const Disclaimer = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='title-col'>
                    <div className='title-container'>
                        <h1>Thank you for visiting Peter Huynh's Herb-A-Pharmacy Prescription Database demo!</h1>
                    </div>
                </div>
            </div>
            <div className='description-row'>
                <div className='description-col'>
                    <div className='description-container'>
                        <h2>Disclaimer:</h2>
                        <p>{"All of the patients in this demo should be fictional. Please do not use real patient names/information when testing this demo. Any information entered in this demo can be viewed by anyone."}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Disclaimer;