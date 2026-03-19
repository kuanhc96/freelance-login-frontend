import axios from 'axios'
import Cookies from "js-cookie";

const csrfToken = Cookies.get('XSRF-TOKEN');
const resourceServerClient = axios.create({
    baseURL: 'http://localhost:8071/freelance',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': csrfToken
    }
})

export default resourceServerClient;
