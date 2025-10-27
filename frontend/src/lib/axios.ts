import axios from "axios";

export const axiosInsttance = axios.create({
    baseURL: "http://localhost:5000",
});

