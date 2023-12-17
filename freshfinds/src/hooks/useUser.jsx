import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);