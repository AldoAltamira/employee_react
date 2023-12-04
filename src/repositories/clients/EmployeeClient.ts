import axios, { AxiosInstance } from "axios";

const baseURL = "http://localhost:3000/employee";

const EmployeeClient: AxiosInstance = axios.create({
  baseURL,
});

EmployeeClient.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error)
);

export default EmployeeClient;
