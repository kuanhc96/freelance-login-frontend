import axios from "axios";

const bffServerClient = axios.create({
    baseURL: 'http://localhost:8083',
    withCredentials: true,
})

export default bffServerClient;
