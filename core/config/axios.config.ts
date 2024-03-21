import axios from 'axios';
import { API_CALL_TIMEOUT } from 'config/constants.config';
import SessionStorage from 'core/util/SessionStorage';

axios.defaults.timeout = API_CALL_TIMEOUT;
axios.defaults.paramsSerializer = {
    encode: (params) => {
        return encodeURI(params);
    },
};

export const JSON_HEADER = { headers: { 'Content-Type': 'application/json' } };

const initAxios = () => {
    const onRequestSuccess = (config) => {
        const token = SessionStorage.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    };

    const onResponseSuccess = (response) => response;
    const onResponseError = (error) => {
        //@TODO GLOBAL ACTION on an ERROR CODE 400? 401? 403? 500?
        // const status = error.status || (error.response ? error.response.status : 0);
        return Promise.reject(error);
    };
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default initAxios;
