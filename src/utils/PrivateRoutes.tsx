import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoutes: React.FC = () => {
    let loggedIn = Cookies.get('loggedIn');
    return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;