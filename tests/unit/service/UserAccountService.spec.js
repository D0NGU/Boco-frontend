import axios from "axios";
import { baseURL } from "@/service/ApiService";


describe('Testing UserAccountService.js', () => {

    it('test axios get for getUserRentalHistory api call', () => {
        jest.spyOn(axios, "get");
        axios.get(baseURL + "products/user/" + "3" + "/history")
        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith(baseURL + "products/user/" + 3 + "/history")
        jest.clearAllMocks()
    });

    it('test axios delete for delete api call', () => {
        jest.spyOn(axios, "delete");
        const userToDelete = {  fname: test, lname: test, email: test, password: test };
        axios.delete(baseURL + "user/", {
            params: {userToDelete}
        })
        expect(axios.delete).toHaveBeenCalledTimes(1)
        expect(axios.delete).toHaveBeenCalledWith(baseURL + "user/", {
            params: {userToDelete}
        })
        jest.clearAllMocks()
    });

    it('test axios put for editPassword api call', () => {
        jest.spyOn(axios, "put");
        const userDetails = {email: "email", oldPassword: "oldPassword", newPassword: "newPassword"};
        axios.put(baseURL + "user/", { userDetails })
        expect(axios.put).toHaveBeenCalledTimes(1)
        expect(axios.put).toHaveBeenCalledWith(baseURL + "user/", { userDetails })
        jest.clearAllMocks()

    });

    it('test axios get for getUser call', () => {
        jest.spyOn(axios, "get");
        const userId = 1
        axios.get(baseURL + "user/get/", {params: {userId}})
        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith(baseURL + "user/get/", {params: {userId}})
        jest.clearAllMocks()
    });

})