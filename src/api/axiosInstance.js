import axios from 'axios';
import environment from '../environment.json'

const baseURL = environment.SERVER_URL;

const axiosInst = axios.create({ baseURL });

const AxiosInstance = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        axiosInst.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${accessToken}`
            return config;
        })
        return axiosInst;
    } else {
        return axiosInst;
    }
}

export default AxiosInstance;