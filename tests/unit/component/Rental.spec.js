import RentalRequest from "@/components/Listing/Rental/RentalRequest";
import { mount } from '@vue/test-utils'

describe('Testing if RentalRequest has vuetify components', () => {
    test('RentalRequest has multiple vuetify components', () => {
        const wrapper = mount(RentalRequest)

        const card = wrapper.find('v-card')
        expect(card.exists()).toBe(true)

        const image = wrapper.find('v-img')
        expect(image.exists()).toBe(true)

        const dialog = wrapper.find('v-dialog')
        expect(dialog.exists()).toBe(true)

        const button = wrapper.find('v-btn')
        expect(button.exists()).toBe(true)
    })
})
