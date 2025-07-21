export const setAccessToken = (token) => {
  localStorage.setItem("accessTokenNew", token);
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  return accessToken;
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};
