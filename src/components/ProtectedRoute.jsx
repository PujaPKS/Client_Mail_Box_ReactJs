import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../components/context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
