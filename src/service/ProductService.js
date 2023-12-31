import { getApiClient } from "@/service/ApiService";

export default {
    getProductById(id) {
        return getApiClient.get('products/'+id, )
    },
    getProductsByUserId(id){
        return getApiClient.get('products/user/'+id)
    },

    getProducts(searchWord, category, sortBy, ascending) {
        const searchParams = {q: searchWord, category: category, sortBy: sortBy, ascending: ascending}
        return getApiClient.get('products/search?q='+searchWord+'&category='+category+'&ascending='+ascending+'&sortBy='+sortBy, {
            //params: {searchParams}
        })
    },

    getOwnerProductAcceptedRentals(productId) {
        return getApiClient.get("rentals/product/"+ productId + "/true")
    },
    getAvailabilityWindow(productId) {
        return getApiClient.get("products/"+productId+"/availability")
    }
}
