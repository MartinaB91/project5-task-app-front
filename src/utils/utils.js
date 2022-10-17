import jwtDecode from "jwt-decode";


export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  // If sign out, timestamp is null and should not be refreshed
  if (localStorage.getItem("refreshTokenTimestamp") == null || localStorage.getItem("refreshTokenTimestamp") == "null") {
    return false;
  }
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};