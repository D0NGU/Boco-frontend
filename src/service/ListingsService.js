import axios from 'axios'

const CATEGORIES_API_BASE_URL = 'http://localhost:8080/api/products/category/';

class ListingsService{
    getCategories(){
        return axios.get(CATEGORIES_API_BASE_URL);
    }
}

const listingService = new ListingsService();

export default {
    async getToken(adname, description, address, price, unlisted, user_id, category) {
        const data = {'adname': adname, 'description':description, 'address':address, 'price':price, 'unlisted':unlisted, 'user_id':user_id, 'category':category};
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: axios.stringify(data),
            url: "http://localhost:8085/api/token"
        };

        return axios(options)
    },
    listingService
}