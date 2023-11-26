import { useEffect, useState } from 'react';

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState({ userType:'' });

  useEffect(() => {
    // Get user details from localStorage only once during mount
    const storedUserDetails = localStorage.getItem('currentUser');

    if (storedUserDetails) {
      const { userType } = JSON.parse(storedUserDetails);
      setUserDetails({ userType });
    }
  }, []); // Empty dependency array ensures this effect runs only once during mount

  return userDetails;
};

export default useUserDetails;
