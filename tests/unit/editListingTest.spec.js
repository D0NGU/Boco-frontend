import EditListing from "@/components/Listing/EditListing"
import EditListingPage from "@/views/EditListing"
import { mount } from '@vue/test-utils'


describe('Test if EditListingPage has components', () => {
    const wrapper = mount(EditListingPage)

    it('Check if EditListing-view contains EditListing-component', () => {
        const editListing = wrapper.findAllComponents(EditListing).at(0)
        expect(editListing.exists()).toBeTruthy()
    });
    it('Check if EditListing-view only contains ONE EditListing-component', () => {
        const editListings = wrapper.findAllComponents(EditListing)
        expect(editListings).toHaveLength(1)
    });
})

describe('Name is set to given value', () => {
    const wrapper = mount(EditListing)

    it('Check if name in EditListing-component is set ',async () => {
        await wrapper.setData({ adName: "Hammer"})
        expect(wrapper.vm.adName).toBe("Hammer")
    });
})