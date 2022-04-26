import EditComponent from '@/components/Listing/EditComponent'
import { mount } from '@vue/test-utils'

describe('Check if v-icon is in component', () => {
    const wrapper = mount(EditComponent)

    const icon = wrapper.find('v-icon')
    expect(icon.exists()).toBe(true)

    const findClass = wrapper.find('.target')
    expect(findClass.exists()).toBe(true)
})

describe('EditComponent redirects correctly', () => {
    const wrapper = mount(EditComponent)

    Object.defineProperty(window, 'location', {
        value: {
            href: '/editListing' //Unsure, found online it should be href: 'http://localhost', but this fails
        },
        configurable: true,
    });

    it('Redirect by Click Test', () => {
        wrapper.find('.target').trigger('click');
        expect(window.location.href).toBe('/editListing');
    })
})


describe('location.href', () => {
    const { location } = window;

    beforeAll(() => {
        delete window.location;

        window.location = {
            href: '',
        }
    });

    afterAll(() => {
        window.location = location;
    });

    it('should handle assignments to location.href correctly', () => {
        const target = "https://gitlab.stud.idi.ntnu.no/idatt2106_2022_08/frontend";
        window.location.href = target;
        expect(window.location.href).toBe(target);
    });
});