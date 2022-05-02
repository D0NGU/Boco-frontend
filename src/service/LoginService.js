import BASE_URL from '../constants';
import axios from 'axios'

export default {
    handleClickSignIn(email, password) {
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);
        return axios.post(BASE_URL + `login`, params,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }});
    },

    handleClickSignUp(firstname, lastname, email, password) {
        const registerNewUserRequest = {fname: firstname, lname: lastname, email: email, password: password};
        return axios.post(BASE_URL + `user/save`, registerNewUserRequest,
            {headers: {
                'Content-Type': 'application/json',
            }});
    },
}

