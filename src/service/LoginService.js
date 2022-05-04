import {baseURL} from "@/service/ApiService";
import axios from 'axios';

export default {
    handleClickSignIn(email, password) {
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);
        return axios.post(baseURL + `login`, params,
            { headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }});
    },

    handleClickSignUp(firstname, lastname, email, address, password) {
        const registerNewUserRequest = {fname: firstname, lname: lastname, email: email, address: address, password: password};
        return axios.post(baseURL + `user/save`, registerNewUserRequest,
            { headers: {
                'Content-Type': 'application/json',
            }});
    },
}

