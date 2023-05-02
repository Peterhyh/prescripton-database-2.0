import './css/SearchTable.css';


const SearchTable = ({ value, query, setSelectedLastName, setSelectedFirstName, setSelectedId }) => {

    const results = value.length

    return (
        <table className={query ? 'new-rx-search-results-container' : 'hide'}>
            <tbody>
                <p className={results === 0 ? '' : 'hide'}>No results</p>
                <tr className={results >= 1 ? 'new-rx-search-results-header' : 'hide'}>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                </tr>


                {value.map((patient) => {
                    return (
                        <tr
                            key={patient._id}
                            className='newrx-search-results'
                            onClick={() => {
                                setSelectedLastName(patient.firstName);
                                setSelectedFirstName(patient.lastName);
                                setSelectedId(patient._id);
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