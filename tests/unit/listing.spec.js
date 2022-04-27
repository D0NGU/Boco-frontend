import { shallowMount } from '@vue/test-utils'
import ListingDetails from '@/components/Listing/ListingDetails.vue'
import { Vuex, createStore } from 'vuex'

describe('ListingDetails.vue', () => {
    const createVuexStore = () =>
        createStore({
            state: {
                myUserId: '',
            },
            mutations: {
                SET_MYUSERID(state, id) {
                    state.myUserId = id;
                },
            }
        })

    it('Check that component renders', () => {
        const wrapper = shallowMount(ListingDetails);
        // Check that details div exists
        expect(wrapper.find('#details').exists()).toBe(true);
        // Check that requestForm exists
        expect(wrapper.find('#requestForm').exists()).toBe(true);
    })
    it('Display error if date is not valid', async () => {
        const wrapper = shallowMount(ListingDetails);
        const button = wrapper.find('v-btn')
        expect(wrapper.find('#errorBox').exists()).toBe(false);
        await button.trigger('click')
        expect(wrapper.find('#errorBox').exists()).toBe(true);
    })
    it('Display confirmation if request was sent', async () => {
        console.log = jest.fn();
        const wrapper = shallowMount(ListingDetails);
        const store = createVuexStore()
        store.commit('SET_MYUSERID', 2)
        var date = new Date();

        expect(store.state.myUserId).toBe(2)
        await wrapper.setData({date: [{date}, {date}]})
        await wrapper.setProps({itemId: '1'})
        const button = wrapper.find('v-btn')

        expect(wrapper.vm.itemId).toBe(1)

        expect(wrapper.find('#requestSent').exists()).toBe(false);
        await button.trigger('click')
        expect(wrapper.find('#requestSent').exists()).toBe(true);
    })
})
