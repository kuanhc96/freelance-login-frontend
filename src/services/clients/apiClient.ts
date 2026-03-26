import axios, {AxiosResponse} from 'axios'
import Cookies from "js-cookie";

const csrfToken = Cookies.get('XSRF-TOKEN');
const resourceServerClient = axios.create({
    baseURL: 'http://localhost:8071/freelance',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': csrfToken
    }
});

resourceServerClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => { Promise.reject(error); }
)

export default resourceServerClient;
