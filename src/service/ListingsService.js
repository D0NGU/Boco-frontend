import {getApiClient} from "@/service/ApiService";

export default {
    getCategories() {
        return getApiClient.get('/categories')
    },
    create(productId, title, description, address, price, unlisted, availableFrom, availableTo, userId, category) {
        const createdProduct = {
            productId: productId,
            title: title,
            description: description,
            address: address,
            price: price,
            unlisted: unlisted,
            availableFrom: availableFrom,
            availableTo: availableTo,
            userId: userId,
            category: category
        };
        return getApiClient.post('http://localhost:8080/api/products', createdProduct)
    },
    edit(productId, title, description, address, price, unlisted, availableFrom, availableTo, userId, category){
        const productToEdit = { productId: productId, title: title, description: description, address: address, price: price, unlisted: unlisted, availableFrom: availableFrom, availableTo: null, userId: userId, category: category };
        return getApiClient.put('products/'+productId, { productToEdit })
    },
    getListing(id) {
        return getApiClient.get('listing/'+id)
    },
    delete(userId, itemId) {
        return getApiClient.delete('products/'+userId+'/delete/?productId='+itemId)
    }
}