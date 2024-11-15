import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/usercontext';

const ProtectedRoute = ({ children }) => {
  const { userdata } = useUserContext();

  if (!userdata) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
