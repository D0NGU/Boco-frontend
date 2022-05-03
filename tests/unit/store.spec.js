import { mutations, actions, getters } from "@/store";
import { createStore } from "vuex";

describe('Testing Vuex-Store', () => {

    it('Test SET_STATUS mutation in store', () => {
        const state = {
            loggedIn: false,
        }
        mutations.SET_STATUS(state, true)
        expect(state.loggedIn).toBe(true)
    });

    it('Test SET_MYUSERID mutation in store', () => {
        const state = {
            myUserId: '',
        }
        mutations.SET_MYUSERID(state, 4)
        expect(state.myUserId).toBe(4)
    });

    it('Test SET_TOKEN mutation in store', () => {
        const state = {
            token: '',
        }
        mutations.SET_TOKEN(state, "testtoken")
        expect(state.token).toBe("testtoken")
    });

    it('Test token getter in store', () => {
        const state = {
            loggedIn: false,
            myUserId: 3,
            token: 'testing',
        }
        const getToken = getters.token(state)
        expect(getToken).toBe("testing")
    });

    it('Test myUserId getter in store', () => {
        const state = {
            loggedIn: false,
            myUserId: 3,
            token: 'testing',
        }
        const getUserId = getters.myUserId(state)
        expect(getUserId).toBe(3)
    });

    it('Test login action in store', () => {
        const testStore = createStore({
            state: {
                loggedIn: false,
                myUserId: '',
                token: '',
            },
            mutations: mutations
        })

        actions.login(testStore,{token: "token", userID: 1});
        expect(testStore.state.loggedIn).toBe(true);
    });

});