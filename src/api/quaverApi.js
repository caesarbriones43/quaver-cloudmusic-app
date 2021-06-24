import axios from "axios";

export const quaverApi = axios.create({
  baseURL: "http://192.168.1.80:5000/api/v1",
});
