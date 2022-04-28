import {mount} from "@vue/test-utils";
import RegisterForm from "@/components/RegisterForm";

describe('RegisterForm.vue', () => {

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
})