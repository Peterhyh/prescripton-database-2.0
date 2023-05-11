import { useSelector } from 'react-redux';

const SearchTable = ({ query, setSelectedId, setPatientLastName, setPatientFirstName }) => {


    const patientList = useSelector(state => state.patientList.list);
    const results = patientList.length
    const patientFirstNames = patientList.map((patient, i) => { return patient.firstName });

    const search = (patientFirstNames) => {
        return patientFirstNames.filter(patient => patient.toLowerCase().includes(query))
    }

    const value = search(patientFirstNames)
    console.log(value);





    return (
        <table className={query ? 'new-rx-search-results-container' : 'hide'}>
            <tbody>
                <p className={results === 0 ? '' : 'hide'}>No results</p>
                <tr className={results >= 1 ? 'new-rx-search-results-header' : 'hide'}>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                </tr>


                {patientList.map((patient) => {
                    return (
                        <tr
                            key={patient._id}
                            className='newrx-search-results'
                            onClick={() => {
                                setSelectedId(patient._id);
                                setPatientLastName(patient.firstName);
                                setPatientFirstName(patient.lastName);
                            }}
                        >
                            <td>{`${patient.lastName}, ${patient.firstName}`}</td>
                            <td>{`${patient.dateOfBirthMonth}/${patient.dateOfBirthDay}/${patient.dateOfBirthYear}`}</td>
                            <td className='newrx-search-results-address'>{`${patient.street}, ${patient.city} ${patient.state}, ${patient.zip} `}</td>
                        </tr>
                    )
                })}

            </tbody>
        </table >

    )
};

export default SearchTable;