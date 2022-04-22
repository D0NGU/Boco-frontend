import LoginService from '@/service/LoginService'
import axios from "axios";

describe('testing LoginService.js', () => {
    it('test handleClickSignUp and handleClickSignIn', async () => {
      //checking if user is registered through axios post
      let registerResponse;
      const expectedRegisterResponse = 'Registered successfully!';
      await LoginService.handleClickSignUp("name1", "name2", "name@name.co", "name")
          .then(response => registerResponse = response.data);
      expect(registerResponse).toEqual(expectedRegisterResponse);

      //checking if user is can log in with registered data through axios post
      let loginResponse;
      const expectedLoginResponse = 'Successfull login';
      await LoginService.handleClickSignIn("name@name.co", "name")
          .then(response => loginResponse = response.data);
      expect(loginResponse).toEqual(expectedLoginResponse);

      //deleting user after testing register and login calls
      let deleteUser = { email: "name@name.co", password: "name"}
      await axios.delete('http://localhost:8080/api/user/delete', {data: deleteUser})
    })
  })