import axios from 'axios'
import store from '@/store'
import VueCookie from 'vue-cookie'

export const getApiClient = axios.create({
    baseURL: `http://localhost:8080/api/`,
    headers: {
        Authorization: 'Bearer ' +VueCookie.get('token')
    }
})