import axios, {AxiosInstance, CreateAxiosDefaults} from 'axios';


export const useAuthApi = (axiosConfig?: CreateAxiosDefaults) => {
    const localStorageTokenAxios = axios.create(axiosConfig);
    localStorageTokenAxios.interceptors.request.use((config) => {
        // add token to request headers
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    });

    const bearerTokenAxios = (token: string): AxiosInstance => {
        // axios instance for making requests
        const axiosInstance = axios.create(axiosConfig);

        // request interceptor for adding token
        axiosInstance.interceptors.request.use((config) => {
            // add token to request headers
            config.headers['Authorization'] = `Bearer ${token}`;
            return config;
        });

        return axiosInstance;
    };

    return {bearerTokenAxios, localStorageTokenAxios}
}
