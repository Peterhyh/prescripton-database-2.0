import Rx from '../../app/assets/img/rx.png';
import { useEffect } from 'react';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import './css/UploadRx.css';

const UploadRx = ({ uploadedRx, setUploadedRx }) => {

    useEffect(() => {
        setUploadedRx(Rx)
    }, [uploadedRx])

    return (
        <div className='rx-container'>
            <h1>Uploaded Rx:</h1>
            <div className='rx-row'>
                <img src={uploadedRx} alt='example prescription' />
            </div>
            <div className='rx-row'>
                <button id='PopoverLegacy' type='button'>Scan</button>
                <UncontrolledPopover
                    placement='bottom'
                    target='PopoverLegacy'
                    trigger='legacy'
                >
                    <PopoverHeader className='popover-header'>
                        Attention:
                    </PopoverHeader>
                    <PopoverBody className='popover-body'>
                        This is only a demo. Scan feature is currently disabled.
                    </PopoverBody>
                </UncontrolledPopover>
            </div>
            <div className='uploadInstruction'>
                <div>
                    <h1>Step 1:</h1>
                    <ul>
                        <li>
                            For this demo, you will not be uploading any prescriptions. Instead, a mock<br />
                            prescription is provided for you above. However, in a professional setting,<br />
                            we would want to scan in the hardcopy to display the image on your work station<br />
                            screen to process it.<br /><br />
                        </li>
                        <li>
                            Click "Select Patient" button above to begin the next step of matching the patient.
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
};

export default UploadRx;