import SearchTable from './SearchTable';
import SelectedPatient from './SelectedPatient';



const PatientSearch = ({ setQuery, query, value, uploadedRx, selectedLastName, selectedFirstName, setSelectedLastName, setSelectedFirstName }) => {

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
                <div>
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
                    <SearchTable value={search(value)} query={query} setSelectedFirstName={setSelectedFirstName} setSelectedLastName={setSelectedLastName} />
                </div>
                {/* <div>
                    <button className='register-patient-button' onClick={() => navigate('/newPatient')}>Register Patient</button>
                </div> */}
            </div>
        </div>
    )
};

export default PatientSearch;