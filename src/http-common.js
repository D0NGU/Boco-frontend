import axios from "axios";
import {baseURL} from "@/service/ApiService";

export default axios.create({
    baseURL: baseURL + "user",
    headers: {
        "Content-type": "application/json"
    }
});