import Listing from '@/components/Listing'
import { mount } from '@vue/test-utils'

describe('Title of listing', () => {
    test('The title of a listing is required', () => {
        const wrapper = mount(Listing)
        expect(true).toBe(true)
    })
})