//import { getApiClient } from "@/service/ApiService";
import ApiService from "@/service/ApiService";
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

    /*getProducts(searchWord, category, pageNumber, sortBy, ascending) {
        const searchParams = {q: searchWord, category: category, page: pageNumber, sortBy: sortBy, ascending: ascending}
        return getApiClient.get('products/search/', {
            params: {searchParams}
        })
    },*/
    searchForProducts(token, page, sortBy) {

        return ApiService.getApiClient(token).get(`/products/search?page=${page}&sortBy=${sortBy}&ascending=false`);

    }
}
