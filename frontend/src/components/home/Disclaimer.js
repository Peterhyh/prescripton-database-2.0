import './css/Disclaimer.css';

const Disclaimer = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='title-col'>
                    <div className='title-container'>
                        <h1>Herb-A-Pharmacy Prescription Database Demo</h1>
                    </div>
                </div>
            </div>
            <div className='demoInstructionsContainer'>
                <div className='demoInstructions'>
                    <h1>Objective:</h1>
                    <ul>
                        <li>The goal of this application is to input and save prescription data to the corresponding patient's profile for future references.</li>
                        <li>Click the "New Rx" button on the navigation bar above to start this demo.</li>
                    </ul>
                </div>
                <div className='description-container'>
                    <div className='demoDisclaimer'>
                        <h1>Disclaimer:</h1>
                        <ul>
                            <li>All of the patients in this demo should be fictional. Please do not use real patient names/information when testing this demo.<br />
                                Any information entered in this demo can be viewed by anyone.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Disclaimer;