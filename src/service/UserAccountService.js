import {getApiClient} from "@/service/ApiService";
import axios from "axios";
import VueCookie from "vue-cookie";

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
    },

    getVerifiedUser(userId) {
        return getApiClient.get('user/' + userId + '/vertified');
    },

    getUserDescription(userId) {
        return getApiClient.get('user/' + userId + '/description');
    },

    updateUserDescription(userId, description) {
        const url = 'http://localhost:8080/api/user/' + userId + '/description';
        var config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +VueCookie.get('token'),
            }
        };
        console.log("description from frontend:" + description)
        return axios.post(url,  {description: description}, config)
    }
}


