import axios from 'axios';
import SelectPatient from '../features/NewRx/SelectPatient';
import { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';
import { toggleAlertOff } from '../slice/toggleAlertSlice';
import { useDispatch, useSelector } from 'react-redux';
import NewRxButtons from '../features/NewRx/NewRxButtons';
import CreateRx from '../features/NewRx/CreateRx';
import UploadRx from '../features/NewRx/UploadRx';
import { newRxButtonsContext, newRxContext } from '../context/NewRxContext';
import SelectedPatient from '../features/NewRx/SelectedPatient';
import './css/NewRx.css';


const NewRxPage = () => {
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.toggleAlert.alert);

    const [query, setQuery] = useState();
    const [value, setValue] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const [openDataEntry, setOpenDataEntry] = useState(false);
    const [openSelectPatient, setOpenSelectPatient] = useState(false);
    const [openUploadRx, setOpenUploadRx] = useState(false);
    const [uploadedRx, setUploadedRx] = useState();
    const [selectedFirstName, setSelectedFirstName] = useState('');
    const [selectedLastName, setSelectedLastName] = useState('');
    const [selectedId, setSelectedId] = useState();
    const [patientName, setPatientName] = useState('');

    useEffect(() => {
        const successTimer = setTimeout(() => {
            dispatch(toggleAlertOff());

            return () => clearTimeout(successTimer);
        }, 5000)
    }, [alert]);

    useEffect(() => {
        axios.get('http://18.212.66.103:8000/newPatient')
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
            <h1 className='newRxPageTitle'>New Rx</h1>
            <Alert className='d-flex justify-content-center' color='success' isOpen={alert}>
                Prescription saved successfully!
            </Alert>
            <div className='newRxPageContent'>
                <newRxButtonsContext.Provider
                    value={{
                        setOpenDataEntry,
                        setOpenSelectPatient,
                        setOpenUploadRx,
                        openSelectPatient,
                        openUploadRx,
                        openDataEntry,
                        selectedFirstName,
                        selectedLastName
                    }}
                >
                    <NewRxButtons />
                </newRxButtonsContext.Provider>

                <div className={openUploadRx ? 'newRxPageUploadRxContainer' : 'hide'}>
                    <UploadRx setUploadedRx={setUploadedRx} uploadedRx={uploadedRx} />
                </div>

                <div className='newRxPageSelectPatientContainer'>
                    <newRxContext.Provider
                        value={{
                            selectedId,
                            openDataEntry,
                            setOpenDataEntry,
                            setOpenSelectPatient,
                            setOpenUploadRx,
                            openUploadRx,
                            value,
                            setQuery,
                            query,
                            uploadedRx,
                            selectedLastName,
                            selectedFirstName,
                            setSelectedLastName,
                            setSelectedFirstName,
                            setSelectedId,
                            patientName,
                            setPatientName,
                            openSelectPatient
                        }}
                    >
                        <div className={openDataEntry || openSelectPatient ? 'uploadRxSelectedPatientContainer' : 'hide'}>
                            <div className='uploadRxContainer'>
                                <h1 className='uploadRxTitle'>Uploaded Rx:</h1>
                                <img src={uploadedRx} alt='Uploaded rx' />
                            </div>
                            <div className={selectedLastName && selectedFirstName ? '' : 'hide'}>
                                <SelectedPatient />
                            </div>
                        </div>
                        <SelectPatient />
                        <CreateRx />

                    </newRxContext.Provider>
                </div>

                <div className={openUploadRx || openSelectPatient || openDataEntry ? 'hide' : 'newRxInstructionContainer'}>
                    <div className='instructionContainer'>
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
        </div >
    )
};

export default NewRxPage;