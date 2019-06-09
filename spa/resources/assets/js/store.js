import { getLocalUser } from "./helpers/auth";
import {LOGIN_SUCCESS,CHANGE_MESSAGE} from "./mutation_types"

const user = getLocalUser();

export default {
    state:{

         currentUser: user,
         isLoggedIn: !!user,
         loading: false,
         auth_error: null,
         customers: [],
         welcome:null
    },
    getters:{
        loading(state) {
            return state.loading;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        currentUser(state) {
            return state.currentUser;
        },
        authError(state) {
            return state.auth_error;
        },
        customers(state) {
            return state.customers;
        },
        welcome(state) {
            return state.welcome;
        }
    },
    mutations:{
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        [LOGIN_SUCCESS](state,payload){
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});
            state.welcome = 'Fez o login Corretamente!!!    '

            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        updateCustomers(state, payload) {
            state.customers = payload;
        },
        [CHANGE_MESSAGE](state,payload){
            state.welcome = payload
        }
    },
    actions:{

        login(context) {
            context.commit("login");
        },
        getCustomers(context) {
            axios.get('/api/customers')

            .then((response) => {
                    context.commit('updateCustomers', response.data.customers);
            })
        },
        changeMessage(context){
            context.commit('CHANGE_MESSAGE',context);
        }
    }
};