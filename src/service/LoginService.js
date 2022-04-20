import axios from 'axios'
import boco from 'boco'

export default {
    /**
     * Gets new token for the provided user-credentials from the authentication-server.
     *
     * @param username Username to user-credentials. (E-mail)
     * @param password Password to user-credentials
     * @returns {AxiosPromise}
     */
    getToken (username, password) {
        const data = { 'username': username, 'password':password };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: boco.stringify(data),
            url: "http://localhost:8085/api/token"
        };

        return axios(options)
    }
}

