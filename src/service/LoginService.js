import axios from 'axios'
import qs from 'qs'

export default {
    /**
     * Gets new token for the provided user-credentials from the authentication-server.
     *
     * @param username Username to user-credentials. (E-mail)
     * @param password Password to user-credentials
     * @returns {AxiosPromise}
     */
    getToken(username, password) {
        const data = {'username': username, 'password': password};
        console.log(username + ", " + password)
        const options = {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data),
            url: "http://10.22.5.18:8080/api/token"
        };

        return axios(options)
    },

    handleClickSignIn(email, password) {
        const loginRequest = { email: email, password: password };
        return axios.post(`http://localhost:8080/api/auth/signin`, loginRequest)
    },

    handleClickSignUp(firstname, lastname, email, password) {
        const registerNewUserRequest = {fname: firstname, lname: lastname, email: email, password: password};
        return axios.post(`http://localhost:8080/api/auth/signup`, registerNewUserRequest)
    },
}

