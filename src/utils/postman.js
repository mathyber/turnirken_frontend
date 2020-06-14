import axios from 'axios';
//import qs from 'qs';
//import { toast } from 'react-toastify';
//import store from '../store/configureStore';

export const postman = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-type': 'application/json;charset=UTF-8'
    },
//    paramsSerializer: params => qs.stringify(params, { indices: false }),
});

/*export const downloader = axios.create({
    baseURL: '/api',
});*/

postman.interceptors.response.use(
    resp => {
        return resp.data;
    },
    error => {
        const { data = {}, status } = error.response;
        const { error: errorText = '', message = '' } = data;

     //   errorText && toast.error(JSON.stringify(errorText) || message || 'Ошибка!');

        if (status === 401) {
           // store.dispatch(logoutRequest());
            console.log("401");
        }

        return Promise.reject(error);
    },
);

export let setAccessToken = token => {
    if (token !== null) {
        postman.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete postman.defaults.headers.common.Authorization;
    }
};

setAccessToken(localStorage.getItem("token"));
