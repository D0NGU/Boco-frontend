import {getApiClient} from "@/service/ApiService";

export default {
    getCategories() {
        return getApiClient.get('products/category')
    },
    edit(productId, title, description, address, price, unlisted, availableFrom, availableTo, userId, category){
        const productToEdit = { productId: productId, title: title, description: description, address: address, price: price, unlisted: unlisted, availableFrom: availableFrom, availableTo: null, userId: userId, category: category };
        return getApiClient.put('products/product/'+productId+'/edit', { productToEdit })
    },
    getListing(id) {
        return getApiClient.get('listing/'+id)
    }
}