import axios from "axios";

export const axiosProject = axios.create({
    baseURL: "https://spapp.onrender.com/forms"
});