import axios from 'axios';
import VueCookie from 'vue-cookie';

export const baseURL = `http://localhost:8080/api/`;
//export const baseURL = `http://10.22.0.141:8080/api/`; //Endre til din ip hvis du skal teste på mobil

export const getApiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' +  VueCookie.get('token') // TODO get(token) er ofte null av en eller annen årsak???
    }
})
