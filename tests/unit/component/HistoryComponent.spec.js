import {mount} from "@vue/test-utils";
import HistoryComponent from "@/components/UserProfile/HistoryComponent";

describe('HistoryComponent.vue', () => {

    it('Test if title renders', () => {
        const wrapper = mount(HistoryComponent);

        expect(wrapper.find("h3").exists()).toBe(true);
        const title = wrapper.find("h3");

        expect(title.text()).toBe('Min historikk')
    });
    it('Test if message renders', () => {
        const wrapper = mount(HistoryComponent);
        expect(wrapper.find("p").exists()).toBe(true);
        const title = wrapper.find("p");

        expect(title.text()).toBe('Du har ingen leid produkter')
    });
    it('Test if refresh button renders', () => {
        const wrapper = mount(HistoryComponent);
        expect(wrapper.find("v-btn").exists()).toBe(true);
        const refresh = wrapper.find("v-btn");

        expect(refresh.text()).toBe('Refresh mdi-cached');
    });
})