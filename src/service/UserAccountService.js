import {getApiClient} from "@/service/ApiService";

export default {
    getUserRentalHistory(myUserId) {
        return getApiClient('products/user/' + myUserId + "/history")
    },

    delete(userId, fname, lname, email, password){
        const userToDelete = {  fname: fname, lname: lname, email: email, password: password };
        return getApiClient.delete('user/', {
            params: {userToDelete}
        })
    },

    editPassword (email, oldPassword, newPassword) {
        const userDetails = {email: email, oldPassword: oldPassword, newPassword: newPassword}
        return getApiClient.put('user/', { userDetails })

    }
}


