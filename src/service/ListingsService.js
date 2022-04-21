import axios from 'axios'
import boco from 'boco'

export default {
    getToken(adname, description, category, price, priceper, date, address, phone) {
        const data = {'adname': adname, 'description':description, 'category':category, 'price':price, 'priceper':priceper, 'date':date, 'address':address, 'phone':phone};
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: boco.stringify(data),
            url: "http://localhost:8085/api/token"
        };

        return axios(options)
    }
}