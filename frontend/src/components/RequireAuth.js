import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.username
            ? <Outlet />
            : <Navigate state={{ from: location }} replace to='/login' />
    );
};

export default RequireAuth;