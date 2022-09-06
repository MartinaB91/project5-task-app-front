import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useRedirect = (signInStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (signInStatus === "signedIn") {
          navigate("");
        }
      } catch (err) {
        if (signInStatus === "signedOut") {
          navigate("");
        }
      }
    };

    handleMount();
  }, [navigate, signInStatus]);
};

export default useRedirect;
