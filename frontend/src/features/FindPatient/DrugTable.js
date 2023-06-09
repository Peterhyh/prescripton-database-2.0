import './css/DrugTable.css';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { drugTableContext } from '../../context/FindPatientContext';

const DrugTable = () => {

    const { showDrugList } = useContext(drugTableContext);

    const prescriptionList = useSelector(state => state.prescriptionList.list);

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    return (
        <table className='drug-table-container'>

            <tbody className={!showDrugList ? 'drug-table-prescription-container' : 'hide'}>
                <tr className='drug-table-header'>
                    <div>
                        <th>Date Entered</th>
                        <th>Medication</th>
                        <th>Direction</th>
                        <th>Quanity</th>
                        <th>Refills</th>
                        <th>Day Supply</th>
                    </div>
                </tr>


                {prescriptionList.length === 0
                    ?
                    <div className='drug-list-no-results'>
                        <p>No Results</p>
                    </div>
                    :
                    prescriptionList.map((data, i) => {
                        return (
                            <tr key={i} className='patient-drug-list'>
                                <div>
                                    <td>{formatter.format(Date.parse(data.createdAt))}</td>
                                    <td>{data.drug}</td>
                                    <td>{data.direction}</td>
                                    <td>{data.quanity}</td>
                                    <td>{data.refills}</td>
                                    <td>{data.daySupply}</td>
                                </div>
                            </tr>
                        )
                    })}

            </tbody>
        </table >
    )
};

export default DrugTable;