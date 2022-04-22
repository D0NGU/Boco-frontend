import axios from 'axios'
import store from '@/store'

export default {
    getApiClient (token) {
        return axios.create({
            baseURL: 'http://10.22.5.18:8085/api',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Bearer ' + token
            }
        })
    }
}
export function getAllProducts(){
    return axios.get('http://localhost:8085/api/products/', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + store.getters.token
        }
    })
        .then((response) => {
            return response.data;
        });
}

export function getProductsInCategory(category) {
    return axios.get('http://localhost:8085/api/products/category/'+ category, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : 'Bearer ' + store.getters.token
        }
    })
        .then((response) => {
            return response.data;
        });
}

export function getProductById(id) {
    return axios.get('http://localhost:8085/api/products/product/'+ id, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : 'Bearer ' + store.getters.token
        }
    })
        .then((response) => {
            return response.data;
        });
}