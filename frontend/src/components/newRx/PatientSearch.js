import SearchTable from './SearchTable';
import SelectedPatient from './SelectedPatient';
import { useNavigate } from 'react-router-dom';



const PatientSearch = ({ setQuery, query, value, uploadedRx, selectedLastName, selectedFirstName, setSelectedLastName, setSelectedFirstName, setSelectedId }) => {
    const navigate = useNavigate()

    const search = (value) => {
        return value.filter(patient => patient.firstName.toLowerCase().includes(query) || patient.lastName.toLowerCase().includes(query));
    }

    return (
        <div className='patientsearch-container'>

            <div className='patientsearch-left'>
                <div className='col-sm-7'>
                    <h1>Uploaded Rx:</h1>
                    <img src={uploadedRx} alt='Uploaded rx' />
                </div>
                <div className={selectedLastName && selectedFirstName ? 'new-rx-selected-patient' : 'hide'}>
                    <SelectedPatient
                        selectedLastName={selectedLastName}
                        selectedFirstName={selectedFirstName}
                        setSelectedLastName={setSelectedLastName}
                        setSelectedFirstName={setSelectedFirstName} />
                </div>
            </div>



            <div className='patientsearch-right'>
                <div className='patientsearch-searchbar-container'>
                    <h1>Select Patient:</h1>
                    <input
                        placeholder='Last, First'
                        type='text'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <SearchTable value={search(value)} query={query} setSelectedFirstName={setSelectedFirstName} setSelectedLastName={setSelectedLastName} setSelectedId={setSelectedId} />
                    <p className='d-flex justify-content-center p-3'>OR</p>
                    <button className='patientsearch-register-button' onClick={() => navigate('/newPatient')}>Register Patient</button>
                </div>
            </div>
        </div>
    )
};

export default PatientSearch;