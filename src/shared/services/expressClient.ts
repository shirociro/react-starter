import axios from "axios";

export const expressClient = axios.create({
  baseURL: import.meta.env.REACT_APP_EXPRESS_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // keep if you use cookies / sessions
});
