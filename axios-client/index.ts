import axios, { AxiosRequestConfig } from "axios";

export const API_URL = 'http://localhost:8000/';

/**
 *  axios 
 */
export default function axiosClient () {

    const defaultOptions:AxiosRequestConfig = {
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': null
        }
    };

    const axiosInstance = axios.create(defaultOptions);

    axiosInstance.interceptors.request.use((config) => {
        
        const token = localStorage.getItem('token');

        if (token) config.headers['Authorization'] = `JWT ${token}`;
        
        return config;
    });

    axiosInstance.interceptors.response.use((config) => {

        if (config.data['token']) {
            localStorage.setItem('token', config.data['token']);
        }

        return config;
    });

    return axiosInstance;
}