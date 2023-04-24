import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import NewRxButtons from '../components/NewRxButtons';


const NewRxPage = () => {

    const [query, setQuery] = useState();
    const [value, setValue] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);


    const handleSuccessDismiss = () => {
        setOpenSuccess(!openSuccess);
    };


    const handleErrorDismiss = () => {
        setOpenError(!openError);
    };

    useEffect(() => {
        axios.get('http://localhost:3001/newPatient')
            .then(json => {
                setValue(json.data);
            })
            .catch(err => console.log(err));
    }, [query]);


    useEffect(() => {
        const successTimeout = setTimeout(() => {
            setOpenSuccess(false)
        }, 3000)
        return () => {
            clearTimeout(successTimeout)
        }
    }, [openSuccess]);


    useEffect(() => {
        const errorTimeout = setTimeout(() => {
            setOpenError(false);
        }, 3000)
        return () => {
            clearTimeout(errorTimeout);
        }
    }, [openError]);



    return (
        <>
            <Header />
            <div className='newrx-container'>
                <NewRxButtons value={value} query={query} setQuery={setQuery} openSuccess={openSuccess} setOpenSuccess={setOpenSuccess} openError={openError} setOpenError={setOpenError} />
            </div >
        </>
    )
};

export default NewRxPage;