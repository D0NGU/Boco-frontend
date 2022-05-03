import {getApiClient} from "@/service/ApiService";
import axios from "axios";

export default {
    getUserRentalHistory(myUserId) {
        return getApiClient.get("products/user/" + myUserId + "/history")
    },

    delete(userId, password){
        return getApiClient.delete('user/delete/', {params: {userId, password}} )
    },

    editPassword (id, email, oldPassword, newPassword) {
        const userDetails = {id: id, email: email, oldPassword: oldPassword, newPassword: newPassword}
        return getApiClient.post('user/edit', userDetails )
    },

    getUser(userId) {
        return getApiClient.get('user/get/', {params: {userId}})
    },

    getUserId(email){
        return getApiClient.get(`user/get/`+email)
    }
}


