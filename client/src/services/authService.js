import API from "./api";

// Register User
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};


// Login User
export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};