import { createContext, useState, useEffect } from "react"

export const CurrentFamilyMemberContext = createContext();

export const CurrentFamilyMemberProvider = ({ children }) => {
  // Inspiration from: 
  // https://developer.mozilla.org/en-US/docs/Web/API/Storage/
  // https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f

  // Get the item from sessionStorage and set state to retrieved value. 
  const sessionStorageItem = sessionStorage.getItem('currentFamilyMember');
  const currMemb = useState(sessionStorageItem);
  useEffect(()=>{
    sessionStorage.setItem('currentFamilyMember', ...currMemb)

},[currMemb]);

  return (
    <CurrentFamilyMemberContext.Provider value={currMemb}>
      {children}
    </CurrentFamilyMemberContext.Provider>
  );
}
