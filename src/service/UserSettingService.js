import axios from "axios";
const DELETE_USER_API_BASE_URL="http://localhost:8080/api/user/delete";

export default {
    delete(userId, fname, lname, email, salt, password){
        const userToDelete = { userId: userId, fname: fname, lname: lname, email: email, salt: salt, password: password };
        return axios.delete(DELETE_USER_API_BASE_URL, userToDelete);
    },
}