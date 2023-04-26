
const SearchTable = ({ value, query, setSelectedLastName, setSelectedFirstName }) => {

    const results = value.length

    return (
        <table className={query ? 'new-rx-search-results-container' : 'hide'}>
            <tbody>
                <p className={results === 0 ? 'newrx-search-results-noresults-header' : 'hide'}>No results</p>
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
                            }}
                        >
                            <td >{`${patient.lastName}, ${patient.firstName}`}</td>
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