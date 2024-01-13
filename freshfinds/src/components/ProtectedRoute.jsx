import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const ProtectedRoute = ({ component: Component }) => {
  const { user } = useUser(); // Get user from context

  if (!user) {
    // If user is not authenticated, redirect to home page
    return <Navigate to="/" />;
  }

  // If user is authenticated, render the passed component
  return <Component />;
};

export default ProtectedRoute;
