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

    updateUser (id, email, address, oldPassword) {
        const userDetails = {id: id, email: email, address: address, oldPassword: oldPassword}
        return getApiClient.post('user/update', userDetails )
    },

    getUser(userId) {
        return getApiClient.get('user/get/', {params: {userId}})
    },

    getUserId(email){
        return getApiClient.get('user/get/'+email)
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
    sendContactForm(id, fname, lname, email, comment, userId){
        const contactForm = { contactFormId: id, fname: fname, lname: lname, email: email, comment: comment, userId: userId};
        return getApiClient.post("contact", contactForm);
    },

    getNumberOfReviews(userId) {
        return getApiClient.get("review/user/" + userId + "/amount");
    },

    getAverageScoreAsOwner(userId) {
        return getApiClient.get("review/user/" + userId + "/average/owner")
    },

    getAverageScoreAsRenter(userId) {
        return getApiClient.get("review/user/" + userId + "/average/renter")
    },
}


