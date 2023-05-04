import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';


const ProtectedRoutes = () => {
    const { auth } = useAuth();
    const location = useLocation();


    return (
        <>
            <Header />

            {
                auth.username
                    ? <Outlet />
                    : <Navigate to='/login' state={{ from: location }} replace />
            }

        </>

    );
};

export default ProtectedRoutes;