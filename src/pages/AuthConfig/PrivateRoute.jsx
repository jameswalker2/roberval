// PrivateRoute.jsx
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '@/pages/AuthConfig/AuthContext.jsx';

const PrivateRoute = ({ element }) => {
	const { user } = useAuth();

	return user ? (element) : (<Navigate to="/login" replace={true}/>);
};

export default PrivateRoute;
