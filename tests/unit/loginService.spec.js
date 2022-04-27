import LoginService from '@/service/LoginService'
import axios from "axios";

beforeEach(() => jest.spyOn(axios, "post"))
afterEach(() => jest.clearAllMocks())

describe('testing LoginService.js', () => {
    it('test axios post with handleClickSignUp and handleClickSignIn', () => {
      LoginService.handleClickSignUp("name1", "name2", "name@name.co", "name");
      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/api/auth/signup", {"email": "name@name.co", "fname": "name1", "lname": "name2", "password": "name"})
    });

  it('test axios post with handleClickSignIn', () => {
    LoginService.handleClickSignIn("name@name.co", "name")
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/api/auth/signin", {"email": "name@name.co", "password": "name"})
  });
})