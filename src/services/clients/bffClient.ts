import axios, {AxiosResponse} from "axios";

const bffServerClient = axios.create({
    baseURL: 'http://localhost:8083',
    withCredentials: true,
})

bffServerClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => { Promise.reject(error); }
)

export default bffServerClient;
