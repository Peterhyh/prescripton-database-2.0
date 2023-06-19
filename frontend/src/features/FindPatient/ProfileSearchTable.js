import { useSelector } from 'react-redux';
import { useContext, useState, useEffect } from 'react';
import { profileSearchTableContext } from '../../context/FindPatientContext';
import './css/ProfileSearchTable.css';

const CHECK_COMMA = /^.*[,].*$/
const CHECK_SPACES = /\s/

const ProfileSearchTable = () => {

    const { query, setSelectedId, setPatientLastName, setPatientFirstName, setPatientAddress, setPatientDob, handleTabState, setSearchedName, setQuery } = useContext(profileSearchTableContext);

    const [searchedFirstName, setSearchedFirstName] = useState('');
    const [searchedLastName, setSearchedLastName] = useState('');

    const checkComma = CHECK_COMMA.test(query);
    const checkSpaces = CHECK_SPACES.test(query);

    const patientList = useSelector(state => state.patientList.list);

    const search = (patientList) => {
        if (checkComma || checkSpaces) {
            return patientList.filter(patient => patient.lastName.includes(searchedLastName) && patient.firstName.includes(searchedFirstName));
        }
        return patientList.filter(patient => patient.lastName.includes(searchedLastName) || patient.firstName.includes(searchedFirstName));
    };

    useEffect(() => {
        if (checkComma) {
            const removeSpaces = query.replace(/\s/g, '');
            const splitQuery = removeSpaces.split(',');
            const filterWhiteSpaces = splitQuery.filter(name => {
                return name !== '';
            });
            setSearchedLastName(filterWhiteSpaces[0]);
            setSearchedFirstName(filterWhiteSpaces[1]);
        } else if (checkSpaces) {
            const splitQuery = query.split(' ');
            const filterWhiteSpaces = splitQuery.filter(name => {
                return name !== '';
            });
            setSearchedLastName(filterWhiteSpaces[1]);
            setSearchedFirstName(filterWhiteSpaces[0]);
        } else {
            setSearchedLastName(query);
            setSearchedFirstName(query);
        }
    }, [query]);

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
        <table className={query ? 'profile-search-results-container' : 'hide'}>
            <tbody>
                <p className={patientQueriedList.length === 0 ? '' : 'hide'}>No results</p>
                <tr className={patientQueriedList.length >= 1 ? '' : 'hide'}>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                </tr>


                {patientQueriedList.map((patient) => {
                    return (
                        <tr
                            key={patient._id}
                            className='profile-search-result-row'
                            onClick={() => {
                                setSelectedId(patient._id);
                                setPatientLastName(patient.firstName);
                                setPatientFirstName(patient.lastName);
                                handleSetAddress(patient);
                                handleSetDob(patient);
                                setSearchedName('');
                                setQuery('');
                                handleTabState();
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

export default ProfileSearchTable;