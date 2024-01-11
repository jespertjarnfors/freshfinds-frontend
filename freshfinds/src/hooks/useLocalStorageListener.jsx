import { useEffect, useState } from "react";

function useLocalStorageListener(key) {
    const [value, setValue] = useState(localStorage.getItem(key));
  
    useEffect(() => {
      const handleStorageChange = () => {
        setValue(localStorage.getItem(key));
      };
  
      window.addEventListener('storage', handleStorageChange);
  
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, [key]);
  
    return value;
  }

  export default useLocalStorageListener;