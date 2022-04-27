import Listing from '@/components/Listing'
import { mount } from '@vue/test-utils'

describe('Check if template is in component', () => {
    const wrapper = mount(Listing)

    const template = wrapper.find('template')
    expect(template.exists()).toBe(true)
})



//TODO Skriv ferdig test her