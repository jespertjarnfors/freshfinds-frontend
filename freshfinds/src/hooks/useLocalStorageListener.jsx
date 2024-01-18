import { useEffect, useState } from "react";

// Custom hook to listen for changes to a specific key in localStorage
function useLocalStorageListener(key) {
    const [value, setValue] = useState(localStorage.getItem(key));
  
    useEffect(() => {
      // Function to handle changes in localStorage
      const handleStorageChange = () => {
         // Update the value state when the specified localStorage key changes
        setValue(localStorage.getItem(key));
      };
  
      window.addEventListener('storage', handleStorageChange);
  
       // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, [key]); // Ensures this effect runs when 'key' changes
  
    return value;
  }

  export default useLocalStorageListener;