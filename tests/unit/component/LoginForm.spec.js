import LoginForm from "@/components/LogIn/LoginForm";
import App from "@/App";
import { createStore } from 'vuex'
import { mount, shallowMount, flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from 'vue-router';
import { router } from "@/router";
import axios from "axios";





let store;

beforeEach(async () => {
        store = createStore({
            state: {
                loggedIn: false,
            },
        })

    jest.mock('axios', () => {
        return {
            create: jest.fn(() => ({
                get: jest.fn(),
                interceptors: {
                    request: { use: jest.fn(), eject: jest.fn() },
                    response: { use: jest.fn(), eject: jest.fn() }
                }
            }))
        }
    })
})


describe('LoginForm.vue', () => {

    it('Test if title renders', () => {
        const wrapper = mount(LoginForm);
        expect(wrapper.find("#loginTitle").exists()).toBe(true);
        const title = wrapper.find("#loginTitle");

        expect(title.element.textContent).toContain('Logg inn')
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

        expect(loginButton.element.textContent).toBe(' Logg inn ')
        expect(registerButton.element.textContent).toBe(' Opprett ny bruker ')
    });
    it('Test for disabled login button', () => {
        const wrapper = mount(LoginForm);
        expect(wrapper.find("#loginBtn").exists()).toBe(true);
        const loginButton = wrapper.find("#loginBtn");
        expect(loginButton.attributes()).toHaveProperty('disabled');

    });
    it('Invalid input --> Display error message', async () => {

        const myData = {
            email: 'invalidEmail',
        }


        const errorMsg = 'Bruker eksisterer ikke!'
        const wrapper = mount(LoginForm, {
            propsData: {
                myData
            },
            global: {
                plugins: [store],
            },
        })

        try {
            await wrapper.setData(myData)


            await wrapper.vm.logInButton()

            expect(wrapper.html()).toContain(errorMsg)
        } catch(e) {
            console.log(e)
        }

    });

})
