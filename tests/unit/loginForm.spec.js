import LoginForm from "@/components/LoginForm";
import App from "@/App";
import { createStore } from 'vuex'
import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from "@/router";
import axios from "axios";

jest.mock('axios');

let router;
let store;

beforeEach(async () => {
    router = createRouter({
        history: createWebHistory(),
        routes: routes,
    }),

    store = createStore({
        state: {
            loggedIn: false,
        },
    })
})


describe('LoginForm.vue', () => {

    it('Test if title renders', () => {
        const wrapper = mount(LoginForm);
        expect(wrapper.find("#loginTitle").exists()).toBe(true);
        const title = wrapper.find("#loginTitle");

        expect(title.element.textContent).toBe('Logg inn')
    });

    it('Test if input field renders', () => {
        const wrapper = mount(LoginForm);
        expect(wrapper.find("#email").exists()).toBe(true);
        expect(wrapper.find("#password").exists()).toBe(true);

        const email = wrapper.find("#email");
        const password = wrapper.find("#password");

        expect(email.element.textContent).toBe('')
        expect(password.element.textContent).toBe('')
    });

    it('Test if buttons renders', () => {
        const wrapper = mount(LoginForm);
        expect(wrapper.find("#loginBtn").exists()).toBe(true);
        expect(wrapper.find("#regBtn").exists()).toBe(true);

        const loginButton = wrapper.find("#loginBtn");
        const registerButton = wrapper.find("#regBtn");

        expect(loginButton.element.textContent).toBe('Logg inn')
        expect(registerButton.element.textContent).toBe('Opprett ny bruker')
    });
    it('Test for disabled login button', () => {
        const wrapper = mount(LoginForm);
        expect(wrapper.find("#loginBtn").exists()).toBe(true);
        const loginButton = wrapper.find("#loginBtn");
        expect(loginButton.attributes()).toHaveProperty('disabled');

    });

    it('Testing routing from LoginForm.vue to RegisterForm.vue', async () => {

        await router.push('/login')
        await router.isReady()

        const wrapper = mount(App, {
            global: {
                plugins: [router, store],
            }
        });

        expect(wrapper.html()).toContain('Logg inn');
        await wrapper.find("#regBtn").trigger('click');
        await flushPromises();
        expect(wrapper.html()).toContain('Opprett bruker');

    });
})