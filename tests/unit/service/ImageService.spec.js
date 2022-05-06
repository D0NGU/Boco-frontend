import axios from "axios";
import { getApiClient, baseURL } from "@/service/ApiService";
import ImageService from "@/service/ImageService";


beforeEach(() => 
    jest.spyOn(getApiClient, 'post'), 
    jest.spyOn(getApiClient, 'get'),
    jest.spyOn(getApiClient, 'delete'),
);
afterEach(() => jest.clearAllMocks());

describe('Testing UserAccountService.js', () => {

    it('test get img from productId', () => {
        ImageService.getImagesByProductId(1);
        expect(getApiClient.get).toHaveBeenCalledTimes(1);
        expect(getApiClient.get).toHaveBeenCalledWith("/products/"+1+"/image")
    });
});