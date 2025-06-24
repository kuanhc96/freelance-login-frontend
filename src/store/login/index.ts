import { LoginResponse } from '@/dto/response/loginResponse';
import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import  { RootState } from '@/store/types';

export interface LoginState {
    login: LoginResponse
    backendService: string
}

const state: LoginState = {
    login: {
        success: false,
        userGUID: '',
        email: '',
        role: ''
    },
    backendService: 'http://localhost:8081/'
}

const mutations: MutationTree<LoginState> = {
    SET_LOGIN_STATUS(state, status: boolean) {
        state.login.success = status;
    },
    SET_ROLE(state, role: string) {
        state.login.role = role;
    },
    SET_USER_ID(state, userGUID: string) {
        state.login.userGUID = userGUID;
    },
    SET_EMAIL(state, email: string) {
        state.login.email = email;
    },
    LOGOUT(state) {
        state.login.success = false;
        state.login.userGUID = '';
        state.login.role = '';
        state.login.email = '';
    }
}

const actions: ActionTree<LoginState, RootState> = {
    login({commit}, payload: LoginResponse) {
        commit('SET_LOGIN_STATUS', payload.success);
        commit('SET_USER_ID', payload.userGUID);
        commit('SET_ROLE', payload.role);
        commit('SET_EMAIL', payload.email);
    },
    logout({commit}) {
        commit('LOGOUT');
    }
}

const getters: GetterTree<LoginState, RootState> = {
    isLoggedIn: state => state.login.success,
    getUserId: state => state.login.userGUID,
    getRole: state => state.login.role,
    getEmail: state => state.login.email,
    getBackendService: state => state.backendService
}
export const login: Module<LoginState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions, 
    getters
}
