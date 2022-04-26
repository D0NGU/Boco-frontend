import axios from 'axios'
import store from '@/store'

export default {
    getApiClient (token) {
        return axios.create({
            baseURL: 'http://10.22.5.18:8080/api',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Bearer ' + token
            }
        })
    }
}
export function getAllProducts(pageNumber){
    return axios.get('http://localhost:8080/api/products?page=' + pageNumber, {
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
    return axios.get('http://localhost:8080/api/products/category/'+ category, {
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

export function getProductById(id, pageNumber) {
    return axios.get('http://localhost:8080/api/products/'+ id, {
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
export function getListing(id) {
    return axios.get('http://localhost:8080/api/listing/'+ id, {
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

export function getProductsByUserId(id){
    return axios.get('http://localhost:8080/api/products/user/'+ id, {
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