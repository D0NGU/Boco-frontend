import { getApiClient } from "@/service/ApiService";

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
