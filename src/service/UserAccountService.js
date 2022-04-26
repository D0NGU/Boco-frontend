import apiService from "@/service/ApiService";
import axios from "axios";
import store from "@/store";

export default {
   
    /**
     * Gets the user details of the user associated with the given email
     *
     * @param email
     * @returns {Promise<AxiosResponse<any>>}
     */
    getUserAccountDetails(email, token) {
        return apiService.getApiClient(token).get(`/user/${email}`);
    }
}

export function editPassword (email, oldPassword, newPassword) {
    const userDetails = {email: email, oldPassword: oldPassword, newPassword: newPassword}
    return axios.put('http://localhost:8080/api/user/', {
        userDetails,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + store.getters.token
        }
    })
        .then((response) => {
            return response.data;
        });
}

