import jwtDecode from "jwt-decode";


export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  if (localStorage.getItem("refreshTokenTimestamp") == null || localStorage.getItem("refreshTokenTimestamp") == "null") {
    alert("Den är null");
    return false;
  }
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};