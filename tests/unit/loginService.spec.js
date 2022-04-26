import LoginService from '@/service/LoginService'
import axios from "axios";

describe('testing LoginService.js', () => {
    it('test handleClickSignUp and handleClickSignIn', async () => {
      //checking if user is registered through axios post
      let registerResponse = '';
      await LoginService.handleClickSignUp("name1", "name2", "name@name.co", "name")
          .then(response => registerResponse = response.status);
      expect(registerResponse).toEqual(201);

      //checking if user is can log in with registered data through axios post
      let loginResponse = '';
      await LoginService.handleClickSignIn("name@name.co", "name")
          .then(response => loginResponse = response.status);
      expect(loginResponse).toEqual(200);

      //deleting user after testing register and login calls
      let deleteUser = { email: "name@name.co", password: "name"}
      await axios.delete('http://localhost:8080/api/user/', {data: deleteUser})
    });

  it('test handleClickSignIn with a user that does not exist', async () => {
    let loginResponse = '';
    await LoginService.handleClickSignIn("fail@fail.co", "fail")
        .then(response => loginResponse = response.status)
        .catch((err) => loginResponse = err.response.status);
    expect(loginResponse).toEqual(404);
  });
  it('test handleClickSignIn with a wrong password', async () => {
    let registerResponse = '';
    await LoginService.handleClickSignUp("name1", "name2", "name@name.co", "name")
        .then(response => registerResponse = response.status)
        .catch((err) => registerResponse = err.response.status);
    expect(registerResponse).toEqual(201);

    let loginResponse = '';
    await LoginService.handleClickSignIn("name@name.co", "fail")
        .then(response => loginResponse = response.status)
        .catch((err) => loginResponse = err.response.status);
    expect(loginResponse).toEqual(403);

    //deleting user after testing register and login calls
    let deleteUser = { email: "name@name.co", password: "name"}
    await axios.delete('http://localhost:8080/api/user/', {data: deleteUser})
  });
  it('test handleClickSignUp with duplicate email', async () => {
    let registerResponse = '';
    await LoginService.handleClickSignUp("name1", "name2", "name@name.co", "name")
        .then(response => registerResponse = response.status);
    expect(registerResponse).toEqual(201);

    let registerResponseTwo = '';
    await LoginService.handleClickSignUp("name1", "name2", "name@name.co", "name")
        .then(response => registerResponseTwo = response.status)
        .catch((err) => registerResponseTwo = err.response.status);
    expect(registerResponseTwo).toEqual(409);

    //deleting user after testing register calls
    let deleteUser = { email: "name@name.co", password: "name"}
    await axios.delete('http://localhost:8080/api/user/', {data: deleteUser})
  });
})