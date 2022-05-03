import LoginService from '@/service/LoginService'
import { baseURL } from "@/service/ApiService";
import axios from "axios";

beforeEach(() => jest.spyOn(axios, "post"))
afterEach(() => jest.clearAllMocks())

describe('Testing LoginService.js', () => {

	it('test axios post with handleClickSignUp', () => {
		LoginService.handleClickSignUp("name1", "name2", "name@name.co", "name");
		expect(axios.post).toHaveBeenCalledTimes(1)
		expect(axios.post).toHaveBeenCalledWith(baseURL + "user/save", {"email": "name@name.co", "fname": "name1", "lname": "name2", "password": "name"}, { headers: {'Content-Type': 'application/json'}})
	});

	it('test axios post with handleClickSignIn', () => {
		LoginService.handleClickSignIn("name@name.co", "name")
		expect(axios.post).toHaveBeenCalledTimes(1)
		expect(axios.post).toHaveBeenCalledWith(baseURL + "login", new URLSearchParams('username=name@name.co&password=name'), { headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
	});
})