import { createContext, useState, useEffect } from "react"

export const CurrentFamilyMemberContext = createContext();

export const CurrentFamilyMemberProvider = ({ children }) => {
  // Inspiration from: https://www.w3schools.com/jsref/met_storage_setitem.asp and 
  // https://blog.logrocket.com/using-localstorage-react-hooks/ and 
  // https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f

  // Get the item from localstorage and set state to retrieved value. 
  const localStorageItem = localStorage.getItem('currentFamilyMember');
  const currMemb = useState(localStorageItem);
  useEffect(()=>{
    localStorage.setItem('currentFamilyMember', ...currMemb)

},[currMemb]);

  return (
    <CurrentFamilyMemberContext.Provider value={currMemb}>
      {children}
    </CurrentFamilyMemberContext.Provider>
  );
}
