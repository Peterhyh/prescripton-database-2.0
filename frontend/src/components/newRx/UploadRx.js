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
            <div className='rx-row'>
                <img src={uploadedRx} alt='example prescription' />
            </div>
            <div className='rx-row'>
                <button id='PopoverLegacy' type='button'>Upload</button>
                <UncontrolledPopover
                    placement='bottom'
                    target='PopoverLegacy'
                    trigger='legacy'
                >
                    <PopoverHeader className='popover-header'>
                        Attention:
                    </PopoverHeader>
                    <PopoverBody className='popover-body'>
                        This is only a demo. Upload feature is currently disabled.
                    </PopoverBody>
                </UncontrolledPopover>
            </div>
        </div>

    )
};

export default UploadRx;