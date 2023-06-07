import './css/SearchTable.css';


const SearchTable = ({ value, query, setQuery, setSelectedLastName, setSelectedFirstName, setSelectedId }) => {

    const results = value.length

    return (
        <table className={query ? 'new-rx-search-results-container' : 'hide'}>
            <tbody>
                <p className={results === 0 ? '' : 'hide'}>No results</p>
                <tr className={results >= 1 ? '' : 'hide'}>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                </tr>


                {value.map((patient) => {
                    return (
                        <tr
                            key={patient._id}
                            className='newRx-search-result-row'
                            onClick={() => {
                                setSelectedLastName(patient.lastName);
                                setSelectedFirstName(patient.firstName);
                                setSelectedId(patient._id);
                                setQuery('');
                            }}
                        >
                            <td>{`${patient.lastName}, ${patient.firstName}`}</td>
                            <td>{`${patient.dateOfBirthMonth}/${patient.dateOfBirthDay}/${patient.dateOfBirthYear}`}</td>
                            <td>{`${patient.street}, ${patient.city} ${patient.state}, ${patient.zip} `}</td>
                        </tr>
                    )
                })}

            </tbody>
        </table >

    )
};

export default SearchTable;