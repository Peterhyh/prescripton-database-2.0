import './css/DrugTable.css';

const DrugTable = ({ drugArray }) => {


    return (
        <table className='drug-table-container'>
            <tbody>
                <tr className='drug-table-header'>
                    <th>DRUG</th>
                </tr>


                {drugArray.map((data) => {
                    return (
                        <tr className='patient-drug-list'>
                            <td>{data}</td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
};

export default DrugTable;