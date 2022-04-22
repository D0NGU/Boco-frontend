import axios from 'axios'

export default {
    getApiClient (token) {
        return axios.create({
            baseURL: 'http://10.22.5.18:8085/api',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : 'Bearer ' + token
            }
        })
    }
}