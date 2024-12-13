import axios from "axios";

export const API_URL = 'http://localhost:5000/user';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('accessToken');
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && originalRequest && originalRequest._isRetry !== true) {
        originalRequest.isRetry = true;
        try {
            const response = await axios.post(API_URL + '/refresh', null, {
                withCredentials: true
            });
            localStorage.setItem('accessToken', response.data);
            originalRequest.headers['Authorization'] = response.data;
            return axios.request(originalRequest);
        } catch (error) {
            console.log(error);
        }
    }
    throw err;
});

export default $api;