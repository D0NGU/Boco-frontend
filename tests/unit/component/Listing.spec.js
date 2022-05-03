import Listing from '@/components/Listing/Listing'
import { mount } from '@vue/test-utils'

describe('Testing Listing.vue', () => {

    test('The title of a listing is required', () => {
        const wrapper = mount(Listing)
        expect(true).toBe(true)
    })
}) // TODO Skriv ferdig test her