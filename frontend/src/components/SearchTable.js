

const SearchTable = ({ value }) => {



    return (
        <table className='search-result-table'>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                </tr>

                {value.map((patient) => {
                    return (
                        <tr key={patient._id} >
                            <td >{`${patient.lastName}, ${patient.firstName}`}</td>
                            <td>{`${patient.dateOfBirthMonth}/${patient.dateOfBirthDay}/${patient.dateOfBirthYear}`}</td>
                            <td>{`${patient.street}, ${patient.city} ${patient.state}, ${patient.zip} `}</td>
                        </tr>
                    )
                })}

            </tbody>
        </table>

    )
};

export default SearchTable;