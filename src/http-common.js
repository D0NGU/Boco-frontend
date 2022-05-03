import {baseURL} from "@/service/ApiService";
import axios from "axios";

export default axios.create({
    baseURL: baseURL + "user",
    headers: {
        "Content-type": "application/json"
    }
});