import axios from 'axios';
import { useState, useEffect } from 'react';
import NewRxButtons from '../components/newRx/NewRxButtons';
import CreateRx from '../components/newRx/CreateRx';
import PatientSearch from '../components/newRx/PatientSearch';
import UploadRx from '../components/newRx/UploadRx';
import './css/NewRx.css';


const NewRxPage = () => {

    const [query, setQuery] = useState();
    const [value, setValue] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const [openDataEntry, setOpenDataEntry] = useState(false);
    const [openSelectPatient, setOpenSelectPatient] = useState(false);
    const [openUploadRx, setOpenUploadRx] = useState(false);
    const [uploadedRx, setUploadedRx] = useState();
    const [selectedFirstName, setSelectedFirstName] = useState();
    const [selectedLastName, setSelectedLastName] = useState();
    const [selectedId, setSelectedId] = useState();



    useEffect(() => {
        axios.get('http://localhost:3001/newPatient')
            .then(json => {
                setValue(json.data);
            })
            .catch(err => console.log(err));
    }, [query]);


    useEffect(() => {
        const successTimeout = setTimeout(() => {
            setOpenSuccess(false)
        }, 3000)
        return () => {
            clearTimeout(successTimeout)
        }
    }, [openSuccess]);


    useEffect(() => {
        const errorTimeout = setTimeout(() => {
            setOpenError(false);
        }, 3000)
        return () => {
            clearTimeout(errorTimeout);
        }
    }, [openError]);

    return (
        <div className='newRxPageContainer'>
            <div className='newRxPageTitle'>
                <h1>New Rx</h1>
            </div>

            <div className='newRxPageContent'>
                <NewRxButtons
                    setOpenDataEntry={setOpenDataEntry}
                    setOpenSelectPatient={setOpenSelectPatient}
                    setOpenUploadRx={setOpenUploadRx}
                    openSelectPatient={openSelectPatient}
                    openUploadRx={openUploadRx}
                    openDataEntry={openDataEntry}
                    selectedFirstName={selectedFirstName}
                    selectedLastName={selectedLastName}
                />

                <div className={openUploadRx ? 'newRxPageUploadRxContainer' : 'hide'}>
                    <UploadRx setUploadedRx={setUploadedRx} uploadedRx={uploadedRx} />
                </div>

                <div className={openSelectPatient ? 'newRxPageSelectPatientContainer' : 'hide'}>
                    <PatientSearch
                        openDataEntry={openDataEntry}
                        setOpenDataEntry={setOpenDataEntry}
                        setOpenSelectPatient={setOpenSelectPatient}
                        setOpenUploadRx={setOpenUploadRx}
                        value={value}
                        setQuery={setQuery}
                        query={query}
                        uploadedRx={uploadedRx}
                        selectedLastName={selectedLastName}
                        selectedFirstName={selectedFirstName}
                        setSelectedLastName={setSelectedLastName}
                        setSelectedFirstName={setSelectedFirstName}
                        setSelectedId={setSelectedId}
                    />

                </div>

                <div className={openDataEntry ? 'data-entry-container' : 'hide'}>
                    <CreateRx
                        selectedId={selectedId}
                        uploadedRx={uploadedRx}
                        selectedLastName={selectedLastName}
                        selectedFirstName={selectedFirstName}
                        setSelectedLastName={setSelectedLastName}
                        setSelectedFirstName={setSelectedFirstName}
                    />
                </div>

                <div className={openUploadRx || openSelectPatient || openDataEntry ? 'hide' : 'newRxInstructionContainer'}>
                    <div className='instructionContainer'>
                        <div>
                            <h1>About the Job:</h1>
                            <p>
                                As a pharmacy technician, one of the many things we are responsible for is to receive and<br />
                                transcribe prescriptions. Prescriptions comes to us in many different forms depending on <br />
                                state regulations and the prescriber's method of prescribing drugs to their patients.<br />
                                Prescriptions can be a paper hardcopy, faxed, or sent electronically known as "eScript".<br />
                                To begin transcribing a mock prescription, proceed to "Upload Rx" above by clicking it.<br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
};

export default NewRxPage;