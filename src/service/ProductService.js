import { getApiClient } from "@/service/ApiService";
import axios from "axios";
import store from "@/store";

export default {
    getProductById(id, pageNumber) {
        return getApiClient.get('products/'+id, {
            params: {pageNumber}
        })
    },
    getProductsByUserId(id){
        return getApiClient.get('products/user/'+id)
    },

    getProducts(searchWord, category, pageNumber, sortBy, ascending) {
        const searchParams = {q: searchWord, category: category, page: pageNumber, sortBy: sortBy, ascending: ascending}
        return getApiClient.get('products/search/', {
            params: {searchParams}
        })
    },
}
export function getProduct(searchWord, category, pageNumber, sortBy, ascending) {
    const searchParams = {q: searchWord, category: category, page: pageNumber, sortBy: sortBy, ascending: ascending}
    return axios.get('http://localhost:8080/api/products/search/', {
        headers: {
            Authorization: "Bearer " + store.getters.token,
        },
        params: {searchParams}
    })
        .then(response => {
            return response.data
        })
}
