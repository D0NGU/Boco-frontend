import LoginForm from "@/components/LoginForm";
import vuetify from 'vuetify'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('testing LoginForm.vue', () => {
    let wrapper;
    beforeEach(()=>{
        const localVue = createLocalVue()
        localVue.use(vuetify)
        wrapper = shallowMount(LoginForm, {
            localVue
        });
    })
    it('renders a vue instance', () => {
        expect(shallowMount(LoginForm).isVueInstance()).toBe(true);
    });


  })