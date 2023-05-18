import axios from 'axios';
import { useState, useEffect } from 'react';
import NewRxButtons from '../components/newRx/NewRxButtons';
import DataEntry from '../components/newRx/DataEntry';
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
        <div className='newrx-container'>


            <NewRxButtons
                setOpenDataEntry={setOpenDataEntry}
                setOpenSelectPatient={setOpenSelectPatient}
                setOpenUploadRx={setOpenUploadRx}
                openSelectPatient={openSelectPatient}
                openUploadRx={openUploadRx}
                openDataEntry={openDataEntry}
            />

            <div className={openUploadRx ? 'upload-rx-container' : 'hide'}>
                <UploadRx setUploadedRx={setUploadedRx} uploadedRx={uploadedRx} />
            </div>

            <div className={openSelectPatient ? 'select-patient-container' : 'hide'}>
                <PatientSearch
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
                <DataEntry
                    selectedId={selectedId}
                    uploadedRx={uploadedRx}
                    selectedLastName={selectedLastName}
                    selectedFirstName={selectedFirstName}
                    setSelectedLastName={setSelectedLastName}
                    setSelectedFirstName={setSelectedFirstName}
                />
            </div>

            <div >
                <div className='instructionContainer'>
                    <div>
                        <h1>The Job:</h1>
                        <p>
                            As a pharmacy technician, one of the many things we are responsible for is to receive and<br />
                            transcribe prescriptions. Prescriptions comes to us in many different forms depending on <br />
                            state regulations and howthe prescriber chooses to prescribe drugs for their patients.<br />
                            Prescriptions can be a physical paper hardcopy given to the patient, faxed, or sent <br />
                            electronically known as "eScript". To begin transcribing a prescription, proceed to<br />
                            "Step 1: Upload Rx" by clicking on it.
                        </p>
                    </div>
                </div>
            </div>

        </div >
    )
};

export default NewRxPage;