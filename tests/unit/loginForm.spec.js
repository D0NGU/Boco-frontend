import LoginForm from "@/components/LoginForm";
import { mount } from "@vue/test-utils";

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
})