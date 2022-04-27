import LoginForm from "@/components/LoginForm";
import { mount } from "@vue/test-utils";
import axios from 'axios';

jest.mock('vue', () => ({
    axios: {
        post: jest.fn()
    },
}));


describe('LoginForm.vue', () => {

    it('Test if title renders', () => {
        const wrapper = mount(LoginForm);
        expect(wrapper.find("#loginTitle").exists()).toBe(true);
        const title = wrapper.find("#loginTitle");

        expect(title.element.textContent).toBe('Login')
    });

    it('Test if labels for email and password renders', () => {
        const wrapper = mount(LoginForm);
        expect(wrapper.find("#emL").exists()).toBe(true);
        expect(wrapper.find("#passL").exists()).toBe(true);

        const emailLabel = wrapper.find("#emL");
        const passwordLabel = wrapper.find("#passL");

        expect(emailLabel.element.textContent).toBe('Email:');
        expect(passwordLabel.element.textContent).toBe('Password:');
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

        expect(loginButton.element.textContent).toBe('Log in')
        expect(registerButton.element.textContent).toBe('Register new user')
    });

    /*it('Trigger log in button', async () => {
        const wrapper = mount(LoginForm);
        jest.spyOn(axios, 'post');

        expect(wrapper.find("#loginBtn").exists()).toBe(true);

        const loginButton = wrapper.find("#loginBtn");

        await loginButton.trigger("click");
        expect(axios.post).toHaveBeenCalledTimes(1);

    });*/

})