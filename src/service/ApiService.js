import axios from 'axios'

export default {
    getApiClient (token) {
        return axios.create({
            baseURL: 'http://localhost:8085/api',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Bearer ' + token
            }
        })
    }
}