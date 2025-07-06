import { LoginResponse } from '@/dto/response/loginResponse';
import { defineStore } from 'pinia';

export interface LoginState {
    loginResponse: LoginResponse
    backendService: string
}

export const useLoginStore = defineStore('login', {
    state: (): LoginState => ({
        loginResponse: {
            success: false,
            userGUID: '',
            email: '',
            role: ''
        },
        backendService: 'http://localhost:8081/'
    }),
    getters: {
        isLoggedIn: state => state.loginResponse.success,
        getUserGUID: state => state.loginResponse.userGUID,
        getRole: state => state.loginResponse.role,
        getEmail: state => state.loginResponse.email,
        getBackendService: state => state.backendService
    },
    actions: {
        login(payload: LoginResponse) {
            this.loginResponse.success = payload.success;
            this.loginResponse.userGUID = payload.userGUID;
            this.loginResponse.role = payload.role;
            this.loginResponse.email = payload.email;
        },
        logout() {
            this.loginResponse.success = false;
            this.loginResponse.userGUID = '';
            this.loginResponse.role = '';
            this.loginResponse.email = '';
        }
    }
})
