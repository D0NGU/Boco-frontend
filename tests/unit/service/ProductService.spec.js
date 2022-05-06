import axios from 'axios'
import ProductService from "@/service/ProductService";
import {getApiClient} from '@/service/ApiService'



// to mock 403 error
jest.mock('axios', () => {
    return {
        create: jest.fn(() => ({
            get: jest.fn(),
            interceptors: {
                request: { use: jest.fn(), eject: jest.fn() },
                response: { use: jest.fn(), eject: jest.fn() }
            }
        }))
    }
})





beforeEach(() => jest.spyOn(getApiClient, "get"))
afterEach(() => jest.clearAllMocks())

describe('Testing ProductService.js', () => {



    it('Test getProductById API call', async () => {

        await ProductService.getProductById(1)
        expect(getApiClient.get).toHaveBeenCalledTimes(1)

    });

    it('Test getProductsByUserId API call', async () => {

        await ProductService.getProductsByUserId(1)
        expect(getApiClient.get).toHaveBeenCalledTimes(1)

    })

    it('Test getProducts API call', async () => {

        const data = {
            searchWord: 'hammer',
            category: 'verktoy',
            sortBy: 'price',
            ascending: false

        }
        await ProductService.getProducts(data.searchWord, data.category, data.sortBy, data.ascending)
        expect(getApiClient.get).toHaveBeenCalledTimes(1)

    })

    it('Test getOwnerProductAcceptedRentals API call', async () => {

        await ProductService.getOwnerProductAcceptedRentals(5)
        expect(getApiClient.get).toHaveBeenCalledTimes(1)

    })

    it('Test getAvailabilityWindow API call', async () => {

        await ProductService.getAvailabilityWindow(2)
        expect(getApiClient.get).toHaveBeenCalledTimes(1)

    })

})

