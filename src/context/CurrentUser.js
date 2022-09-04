import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


export const CurrentUser = createContext();
export const SetCurrentUser = createContext();

export const useCurrentUser = () => useContext(CurrentUser);
export const useSetCurrentUser = () => useContext(SetCurrentUser);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { data: user } = await axios.get("dj-rest-auth/user/");
      setCurrentUser(user);
    } catch (error) {
      alert(error); // TODO: Remove before prod
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUser.Provider value={currentUser}>
      <SetCurrentUser.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUser.Provider>
    </CurrentUser.Provider>
  );
};