import { useSelector } from 'react-redux';

const ProfileSearchTable = ({ query, setSelectedId, setPatientLastName, setPatientFirstName, setPatientAddress, setPatientDob, handleTabState }) => {


    const patientList = useSelector(state => state.patientList.list);

    const search = (patientList) => {
        return patientList.filter(patient => patient.lastName.toLowerCase().includes(query))
    };

    const patientQueriedList = search(patientList);

    const handleSetAddress = (patient) => {
        const patientAddress = `${patient.street} ${patient.city}, ${patient.state} ${patient.zip}`;
        setPatientAddress(patientAddress);
    };

    const handleSetDob = (patient) => {
        const patientDob = `${patient.dateOfBirthMonth} / ${patient.dateOfBirthDay} / ${patient.dateOfBirthYear}`;
        setPatientDob(patientDob);
    };

    return (
        <table className={query ? 'new-rx-search-results-container' : 'hide'}>
            <tbody>
                <p className={patientQueriedList.length === 0 ? '' : 'hide'}>No results</p>
                <tr className={patientQueriedList.length >= 1 ? 'new-rx-search-results-header' : 'hide'}>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                </tr>


                {patientQueriedList.map((patient) => {
                    return (
                        <tr
                            key={patient._id}
                            className='newrx-search-results'
                            onClick={() => {
                                setSelectedId(patient._id);
                                setPatientLastName(patient.firstName);
                                setPatientFirstName(patient.lastName);
                                handleSetAddress(patient);
                                handleSetDob(patient);
                                handleTabState();
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

export default ProfileSearchTable;