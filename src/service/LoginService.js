import axios from 'axios'

export default {
    handleClickSignIn(email, password) {
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);
        return axios.post(`http://localhost:8080/api/login`, params,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }});
    },

    handleClickSignUp(firstname, lastname, email, password) {
        const registerNewUserRequest = {fname: firstname, lname: lastname, email: email, password: password};
        return axios.post(`http://localhost:8080/api/user/save`, registerNewUserRequest,
            {headers: {
                'Content-Type': 'application/json',
            }});
    },
}

