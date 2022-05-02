import BASE_URL from '../constants';
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
        return getApiClient.post(BASE_URL + 'products', createdProduct)
    },
    editProduct(productId, description, address, price, unlisted, category){
        const product = { description: description, address: address, price: price, unlisted: unlisted, category: category };
        console.log(product)
        return getApiClient.put('products/'+productId,  product)
    },
    getListing(id) {
        return getApiClient.get('listing/'+id)
    },
    delete(userId, itemId) {
        return getApiClient.delete('products/'+userId+'/delete/?productId='+itemId)
    }
}