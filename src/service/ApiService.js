import BASE_URL from '../constants';
import VueCookie from 'vue-cookie';
import axios from 'axios';

export const getApiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + VueCookie.get('token')
    }
})
