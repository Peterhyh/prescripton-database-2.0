import './css/DrugTable.css';

const DrugTable = ({ drugArray }) => {
    console.log(drugArray);
    return (
        <table className='drug-table-container'>
            <tbody>
                <tr className='drug-table-header'>
                    <th>DRUGS PRESCRIBED</th>
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