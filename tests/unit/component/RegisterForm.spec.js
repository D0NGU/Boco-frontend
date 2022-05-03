import RegisterForm from "@/components/RegisterForm";
import App from "@/App";
import { createStore } from 'vuex'
import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from "@/router";

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

const store = createStore({
    state: {
        loggedIn: false,
    },
})

describe('Testing RegisterForm.vue', () => {

    it('Test if title renders', () => {
        const wrapper = mount(RegisterForm);
        expect(wrapper.find("#title").exists()).toBe(true);
        const title = wrapper.find("#title");

        expect(title.text()).toBe('Opprett bruker')
    });

    it('Test if input field renders', () => {
        const wrapper = mount(RegisterForm);
        expect(wrapper.find("#firstname").exists()).toBe(true);
        expect(wrapper.find("#lastname").exists()).toBe(true);
        expect(wrapper.find("#email").exists()).toBe(true);
        expect(wrapper.find("#password").exists()).toBe(true);

        const firstname = wrapper.find("#firstname");
        const lastname = wrapper.find("#lastname");
        const email = wrapper.find("#email");
        const password = wrapper.find("#password");

        expect(firstname.text()).toBe('')
        expect(lastname.text()).toBe('')
        expect(email.text()).toBe('')
        expect(password.text()).toBe('')
    });

    it('Test if buttons renders', () => {
        const wrapper = mount(RegisterForm);
        expect(wrapper.find("#rBtn").exists()).toBe(true);
        expect(wrapper.find("#backToLoginButton").exists()).toBe(true);

        const registerButton = wrapper.find("#rBtn");
        const backToLoginBtn = wrapper.find("#backToLoginButton");

        expect(registerButton.text()).toBe('Opprett bruker')
        expect(backToLoginBtn.text()).toContain('Logg inn')
    });

    it('Test for disabled "Opprett bruker" button', () => {
        const wrapper = mount(RegisterForm);
        expect(wrapper.find("#rBtn").exists()).toBe(true);
        const registerBtn = wrapper.find("#rBtn");
        expect(registerBtn.attributes()).toHaveProperty('disabled');
    });

    it('Testing routing from RegisterForm.vue to LoginForm.vue', async () => {

        await router.push('/register')
        await router.isReady()

        const wrapper = mount(App, {
            global: {
                plugins: [router, store],
            }
        });

        expect(wrapper.html()).toContain('Opprett bruker');
        await wrapper.find("#backToLoginButton").trigger('click');
        await flushPromises();
        expect(wrapper.html()).toContain('Logg inn');
    });

})