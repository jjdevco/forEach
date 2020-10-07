import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_APP_ENDPOINT,
  headers: { withCredentials: true },
});

export default {
  trips: {
    getAll: (options = {}) => instance.get("/trips", options),
    create: (data, options = {}) => instance.post("/trip", data, options),
  },
  users: {
    login: (data, options = {}) => instance.post("/auth/login", data, options),
    init: (data, options = {}) => instance.post("/auth/init", data, options),
  },
};
