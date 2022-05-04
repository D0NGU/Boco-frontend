import {getApiClient} from "@/service/ApiService";

export default {
    getImagesByProductId(id) {
        return getApiClient.get("/products/"+id+"/image");
    },
    getProfilePic(id) {
        return getApiClient.get("/"+id+"/picture");
    },
    setProfilePic(pic64, id) {
        return getApiClient.put("/"+id+"/picture", pic64);
    }
}