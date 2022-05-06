import ReviewService from '@/service/ReviewService'
import { getApiClient } from "@/service/ApiService";

beforeEach(() => 
    jest.spyOn(getApiClient, 'post'), 
    jest.spyOn(getApiClient, 'get')
);
afterEach(() => jest.clearAllMocks());

describe('Testing ReviewService.js', () => {

    it('test call to create review', () => {
        ReviewService.create('test_review_comment', 5, true, 1, 2);
        expect(getApiClient.post).toHaveBeenCalledTimes(1);
        expect(getApiClient.post).toHaveBeenCalledWith('review', {'text':'test_review_comment', 'stars':5, 'owner':true, 'author':1, 'subject':2})
    });

    it('test getting your own reviews', () => {
        ReviewService.getMyReviews(1);
        expect(getApiClient.get).toHaveBeenCalledTimes(1);
        const params = {subject: 1, author: null}
        expect(getApiClient.get).toHaveBeenCalledWith('review', {'params':params})
    });
})