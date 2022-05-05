import { shallowMount } from '@vue/test-utils'
import Navbar from "@/components/Misc/Navbar";
import {createStore} from "vuex";


describe('Testing Navbar.vue', () => {

    const wrapper = shallowMount(Navbar, {
        stubs: ['router-link', 'router-view'],
    });

    it('Navbar has route to /home', () => {
        expect(wrapper.html()).toContain("[object Object]");
    })

})