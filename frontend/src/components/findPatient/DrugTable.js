import './css/DrugTable.css';
import { useSelector } from 'react-redux';
import DownArrow from '../../app/assets/img/downArrow.svg'
import RightArrow from '../../app/assets/img/rightArrow.svg';

const DrugTable = ({ setShowDrugList, showDrugList }) => {

    const drugList = useSelector(state => state.drugList.list);

    const list = drugList.filter(list => {
        return list.length > 0
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
                    <h5>Medication</h5>
                </tr>


                {list.length == 0
                    ?
                    <div className='drug-list-no-results'>
                        <p>No Results</p>
                    </div>
                    :
                    list.map((data, i) => {
                        return (
                            <tr key={i} className='patient-drug-list'>
                                <td>{data}</td>
                            </tr>
                        )
                    })}

            </tbody>
        </table >
    )
};

export default DrugTable;