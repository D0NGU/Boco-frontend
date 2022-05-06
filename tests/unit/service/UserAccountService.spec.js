import UserAccountService from "@/service/UserAccountService";
import { getApiClient, baseURL } from "@/service/ApiService";

beforeEach(() => 
    jest.spyOn(getApiClient, 'post'), 
    jest.spyOn(getApiClient, 'get'),
    jest.spyOn(getApiClient, 'delete'),
);
afterEach(() => jest.clearAllMocks());

describe('Testing UserAccountService.js', () => {

    it('test axios get for getUserRentalHistory api call', () => {
        UserAccountService.getUserRentalHistory(3)
        expect(getApiClient.get).toHaveBeenCalledTimes(1)
        expect(getApiClient.get).toHaveBeenCalledWith("products/user/" + 3 + "/history")
    });

    it('test axios delete for delete api call', () => {
        UserAccountService.delete(1, 'password')
        expect(getApiClient.delete).toHaveBeenCalledTimes(1)
        const deleteParams = {  'userId':1, 'password':'password' };
        expect(getApiClient.delete).toHaveBeenCalledWith("user/delete/", {'params': deleteParams})
    });

    it('test axios put for editPassword api call', () => {
        const userDetails = {id:1, email:"email", oldPassword:"oldPassword", newPassword:"newPassword"};
        UserAccountService.editPassword(1,'email','oldPassword','newPassword');
        expect(getApiClient.post).toHaveBeenCalledTimes(1)
        expect(getApiClient.post).toHaveBeenCalledWith("user/edit", userDetails)
    });

    it('test axios get for getUser call', () => {
        const userId = 1
        UserAccountService.getUser(1);
        expect(getApiClient.get).toHaveBeenCalledTimes(1)
        expect(getApiClient.get).toHaveBeenCalledWith("user/get/", {params: {userId}})
    });

    it('test getUserId call', () => {
        UserAccountService.getUserId('test@tset.edu');
        expect(getApiClient.get).toHaveBeenCalledTimes(1);
        expect(getApiClient.get).toHaveBeenCalledWith('user/get/'+'test@tset.edu')
    });

    it('test vertified user', () => {
        UserAccountService.getVerifiedUser(1);
        expect(getApiClient.get).toHaveBeenCalledTimes(1);
        expect(getApiClient.get).toHaveBeenCalledWith('user/' + 1 + '/vertified')
    });

    it('test getAverageScoreAsRenter', () => {
        UserAccountService.getAverageScoreAsOwner(1);
        expect(getApiClient.get).toHaveBeenCalledTimes(1);
        expect(getApiClient.get).toHaveBeenCalledWith('review/user/' + 1 + '/average/owner')
    });
})