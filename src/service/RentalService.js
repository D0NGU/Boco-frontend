import {getApiClient} from "@/service/ApiService";

export default {
    getRentals(id) {
        return getApiClient.get('rentals/product/'+id+'/false')
    },
    newRental(dateFrom, dateTo, productId, userId) {
        const rental = {dateFrom: dateFrom, dateTo: dateTo, accepted: false, productId: productId, userId: userId}
        return getApiClient.post("rentals",  rental)
    },
    accept(id){
        return getApiClient.put('rentals/accept/'+id)
    },

    deny(id){
        return getApiClient.delete('rentals/'+id)
    }
}
