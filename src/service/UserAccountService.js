import {getApiClient} from "@/service/ApiService";
import axios from "axios";

export default {
    getUserRentalHistory(myUserId) {
        return getApiClient.get("products/user/" + myUserId + "/history")
    },

    delete(userId, fname, lname, email, password){
        const userToDelete = {  fname: fname, lname: lname, email: email, password: password };
        return getApiClient.delete('user/', {
            params: {userToDelete}
        })
    },

    editPassword (email, oldPassword, newPassword) {
        const userDetails = {email: email, oldPassword: oldPassword, newPassword: newPassword}
        return getApiClient.post('user/edit/', userDetails )
    },

    getUser(userId) {
        return getApiClient.get('user/get/', {params: {userId}})
    },

    getUserId(email){
        return getApiClient.get(`user/get/`+email)
    }
}


