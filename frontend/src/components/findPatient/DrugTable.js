import './css/DrugTable.css';
import { useSelector } from 'react-redux';
import DownArrow from '../../app/assets/img/downArrow.svg'
import RightArrow from '../../app/assets/img/rightArrow.svg';

const DrugTable = ({ setShowDrugList, showDrugList }) => {

    const prescriptionList = useSelector(state => state.prescriptionList.list);

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    return (
        <table className='drug-table-container'>
            <div className='drug-table-header-carot' onClick={() => setShowDrugList(!showDrugList)}>
                <img className={showDrugList ? 'hide' : ''} src={RightArrow} alt='' />
                <img className={showDrugList ? '' : 'hide'} src={DownArrow} alt='' />
                <h5>PRESCRIPTION</h5>
            </div>
            <tbody className={showDrugList ? 'drug-table-prescription-container' : 'hide'}>
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