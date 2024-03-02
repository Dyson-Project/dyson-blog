import axios, {AxiosError, AxiosInstance, CreateAxiosDefaults} from 'axios';
import {jwtService} from "@/hooks/jwtService";
import {useAuth} from "@/hooks/useAuth";


export const useAuthApi = (axiosConfig?: CreateAxiosDefaults) => {
    const localStorageTokenAxios = axios.create(axiosConfig);
    const {removeToken, getToken} = jwtService();
    const {logout} = useAuth();

    localStorageTokenAxios.interceptors.request.use((config) => {
        // add token to request headers
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    });

    const bearerTokenAxios = (token?: string): AxiosInstance => {
        // axios instance for making requests
        const axiosInstance = axios.create(axiosConfig);

        // request interceptor for adding token
        axiosInstance.interceptors.request.use(config => {
            // add token to request headers
            config.headers['Authorization'] = `Bearer ${token}`;
            return config;
        }, error => Promise.reject(error));

        // response interceptor for refresh token
        axiosInstance.interceptors.response.use((response) => {
                console.log(response);
                return response;
            }, (error: AxiosError) => {
                const {response, config} = error;
                const status = response?.status;
                console.log("===========>", error)
                // if (status === 406) {
                //     removeToken();
                //     logout();
                // }
                //
                // if (status === 401) {
                //     if (!getToken()) {
                //         return Promise.reject(error);
                //     }
                //     logout();
                //     return Promise.reject(error);
                // }
                return Promise.reject(error);
            }
        )

        return axiosInstance;
    };

    return {bearerTokenAxios, localStorageTokenAxios}
}
