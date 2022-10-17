import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {shouldRefreshToken} from "../utils/utils";

export const useRedirect = (signInStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        if (shouldRefreshToken()) {
          alert("useRedirect" + shouldRefreshToken()); 
          await axios.post("/dj-rest-auth/token/refresh/");
        }
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
