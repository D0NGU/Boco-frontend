import axios from 'axios'
import store from '@/store'

export const getApiClient = axios.create({
    baseURL: `http://localhost:8080/api/`,
    headers: {
        Authorization: `Bearer ${store.getters.token}`,
    }
})