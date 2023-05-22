import Disclaimer from "../components/home/Disclaimer";
import './css/Home.css';

const HomePage = () => {
    return (
        <div className='home-container'>
            <h1>Home Page</h1>
            <Disclaimer />
        </div>
    )
};

export default HomePage;