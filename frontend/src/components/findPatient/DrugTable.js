import './css/DrugTable.css';
import { useSelector } from 'react-redux';

const DrugTable = () => {

    const drugList = useSelector(state => state.drugList.list);

    const list = drugList.filter(list => {
        return list.length > 0
    });

    return (
        <table className='drug-table-container'>
            <tbody>
                <tr className='drug-table-header'>
                    <th>DRUG</th>
                </tr>


                {list.map((data, i) => {
                    return (
                        <tr key={i} className='patient-drug-list'>
                            <td>{data}</td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
};

export default DrugTable;