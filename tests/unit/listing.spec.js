import { shallowMount } from '@vue/test-utils'
import ListingDetails from '@/components/Listing/ListingDetails.vue'

describe('ListingDetails.vue', () => {
    it('Check that component renders', () => {
        const wrapper = shallowMount(ListingDetails);
        // Check that details div exists
        expect(wrapper.find('#details').exists()).toBe(true);
        // Check that requestForm exists
        expect(wrapper.find('#requestForm').exists()).toBe(true);
    })
    it('Send request without filling form', async () => {
        const wrapper = shallowMount(ListingDetails);
        const button = wrapper.find('v-btn')
        expect(wrapper.find('#errorBox').exists()).toBe(false);
        await button.trigger('click')
        expect(wrapper.find('#errorBox').exists()).toBe(true);
    })
})
