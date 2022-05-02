import axios from 'axios'
import VueCookie from 'vue-cookie'

export const getApiClient = axios.create({
    baseURL: `http://localhost:8080/api/`,
    headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' +VueCookie.get('token')
    }
})
