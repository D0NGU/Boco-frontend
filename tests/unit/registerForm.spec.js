import {mount} from "@vue/test-utils";
import RegisterForm from "@/components/RegisterForm";

describe('RegisterForm.vue', () => {

    it('Test if title renders', () => {
        const wrapper = mount(RegisterForm);
        expect(wrapper.find("#title").exists()).toBe(true);
        const title = wrapper.find("#title");

        expect(title.text()).toBe('Register')
    });

    it('Test if all labels renders', () => {
        const wrapper = mount(RegisterForm);
        expect(wrapper.find("#fnL").exists()).toBe(true);
        expect(wrapper.find("#lnL").exists()).toBe(true);
        expect(wrapper.find("#emLab").exists()).toBe(true);
        expect(wrapper.find("#passLab").exists()).toBe(true);

        const fnL = wrapper.find("#fnL");
        const lnL = wrapper.find("#lnL");
        const emLab = wrapper.find("#emLab");
        const passLab = wrapper.find("#passLab");

        expect(fnL.text()).toBe('First Name:');
        expect(lnL.text()).toBe('Last Name:');
        expect(emLab.text()).toBe('Email:');
        expect(passLab.text()).toBe('Password:');
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

    it('Test if register button renders', () => {
        const wrapper = mount(RegisterForm);
        expect(wrapper.find("#rBtn").exists()).toBe(true);

        const registerButton = wrapper.find("#rBtn");
        expect(registerButton.text()).toBe('Register')
    });
})