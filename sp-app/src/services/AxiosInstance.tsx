import axios from "axios";

export const axiosProject = axios.create({
    baseURL: "http://localhost:3001/forms"
});