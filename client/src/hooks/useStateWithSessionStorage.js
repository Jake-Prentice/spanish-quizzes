import React, {useEffect, useState} from 'react';
 
const useStateWithSessionStorage = (sessionStorageKey, defaultValue="") => {
  const [value, setValue] = useState(
    sessionStorage.getItem(sessionStorageKey) || defaultValue
  );
 
  useEffect(() => {

    if (!!value || value === 0) { //check value is valid - cause otherwise ur just turning it to a string
      sessionStorage.setItem(sessionStorageKey, value);
    }
    
  }, [value]);
 
  return [value, setValue];
};



export default useStateWithSessionStorage;