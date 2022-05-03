import {getApiClient} from "@/service/ApiService";

export default {
    getImagesByProductId(id) {
        return getApiClient.get("/products/"+id+"/image");
    }
}