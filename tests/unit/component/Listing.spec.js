import Listing from '@/components/Listing/Listing'
import { mount, shallowMount } from '@vue/test-utils'
describe('Testing Listing.vue', () => {


    test('The title of a listing is required and > 2 characters', () => {

        let myData = {
            adName: 'no'
        }

        const wrapper = shallowMount(Listing, {
            propsData: {
                myData
            }
        })

        wrapper.setData(myData)
        expect(wrapper.html()).toContain('Minimum 3 bokstaver.')
    });


})