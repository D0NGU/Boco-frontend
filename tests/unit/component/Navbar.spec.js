import { shallowMount, mount } from '@vue/test-utils'
import Navbar from "@/components/Misc/Navbar";
import {createStore} from "vuex";


describe('Testing Navbar.vue', () => {

    const wrapper = mount(Navbar, {
        stubs: ['router-link', 'router-view'],
    });

    /*
        At render the Object points to a route in router.
        if Object exists the navbar must point to valid routes
     */
    it('Navbar has routes', () => {
        expect(wrapper.html()).toContain("[object Object]");
    })

})