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

describe('Testing if Listing has vuetify components', () => {
    test('Listing has multiple vuetify components', () => {
        const wrapper = mount(Listing)

        const button = wrapper.find('v-btn')
        expect(button.exists()).toBe(true)

        const textField = wrapper.find('v-text-field')
        expect(textField.exists()).toBe(true)

        const card = wrapper.find('v-card')
        expect(card.exists()).toBe(true)

        const vSwitch = wrapper.find('v-switch')
        expect(vSwitch.exists()).toBe(true)

        const snackbar = wrapper.find('v-snackbar')
        expect(snackbar.exists()).toBe(false)
    })
})