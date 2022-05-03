import {getApiClient} from "@/service/ApiService";
import axios from "axios";
import VueCookie from "vue-cookie";

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
    },

    getVerifiedUser(userId) {
        return getApiClient.get('user/' + userId + '/vertified');
    },

    getUserDescription(userId) {
        const url = 'http://localhost:8080/api/user/' + userId + '/description';
        var config = {
            headers: {
                'Content-Type': 'text/plain',
                Authorization: 'Bearer ' + VueCookie.get('token'),
            }
        };
        return axios.get(url, config);
    },

    updateUserDescription(userId, description) {
        const url = 'http://localhost:8080/api/user/' + userId + '/description';
        var config = {
            headers: {
                'Content-Type': 'text/plain',
                Authorization: 'Bearer ' + VueCookie.get('token'),
            }
        };
        return axios.post(url, description, config)
    },

    sendContactForm(name, email, comment){
        const contactForm = { name: name, email: email, comment: comment};
        return getApiClient.post(UNKNOWN, {params: {contactForm}})
    },
}


