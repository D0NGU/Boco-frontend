import apiService from "@/service/ApiService";

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
