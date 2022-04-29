import {getApiClient} from "@/service/ApiService";

export default {
    create(comment, stars, owner, author, subject){
        const review = {comment: comment, stars: stars, owner: owner, author: author, subject: subject}
        return getApiClient.post('review', review);
    }
}