import axios from 'axios'

export default {
    handleClickSignIn(email, password) {
        const loginRequest = { email: email, password: password };
        return axios.post(`http://localhost:8080/api/auth/signin`, loginRequest);
    },

    handleClickSignUp(firstname, lastname, email, password) {
        const registerNewUserRequest = {fname: firstname, lname: lastname, email: email, password: password};
        return axios.post(`http://localhost:8080/api/auth/signup`, registerNewUserRequest);
    },
}

