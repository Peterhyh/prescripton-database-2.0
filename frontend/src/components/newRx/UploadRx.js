import Rx from '../../app/assets/img/rx.png';
import { useEffect } from 'react';

const UploadRx = ({ uploadedRx, setUploadedRx }) => {


    useEffect(() => {
        setUploadedRx(Rx)
    }, [uploadedRx])

    return (
        <div>
            <img src={uploadedRx} alt='sample prescription' />
        </div>
    )
};

export default UploadRx;