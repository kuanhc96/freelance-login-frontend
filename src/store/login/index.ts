import { LoginResponse } from '@/dto/response/loginResponse';
import { LoginRequest } from '@/dto/request/loginRequest';
import { defineStore } from 'pinia';
import Cookies from "js-cookie";
import router from "@/router/router";

export interface LoginState {
    xsrfToken: string
    userGUID: string
    email: string
    role: string
    backendService: string
}

export const useLoginStore = defineStore('login', {
    state: (): LoginState => ({
        xsrfToken: Cookies.get('XSRF-TOKEN') || '',
        userGUID: localStorage.getItem('userGUID') || '',
        email: '',
        role: '',
        backendService: 'http://localhost:8081/'
    }),
    getters: {
        isLoggedIn: (state) => {
            console.log("LOL", state.xsrfToken);
            console.log("LOL", state.userGUID);
            return !!state.userGUID?.trim() && !!state.xsrfToken?.trim()
        },
        getXsrfToken: state => state.xsrfToken,
        getUserGUID: state => state.userGUID,
        getRole: state => state.role,
        isStudent: state => state.role === 'STUDENT',
        getEmail: state => state.email,
        getBackendService: state => state.backendService
    },
    actions: {
        async checkLogin(): Promise<void> {
            if (this.isLoggedIn) {
                const response = await fetch(
                    'http://localhost:8081/checkLogin', {
                        method: 'POST',
                        credentials: 'include'
                    }
                );

                if (response.ok) {
                    const data: LoginResponse = await response.json();
                    if (data) {
                        this.userGUID = data.userGUID;
                        localStorage.setItem('userGUID', data.userGUID);
                        this.xsrfToken = Cookies.get('XSRF-TOKEN');
                        this.role = data.role;
                        this.email = data.email;
                        await router.replace('/')
                    }
                } else {
                    throw new Error('Not authenticated')
                }
            } else {
                await router.replace('/login');
            }

        },
        async login(loginRequest: LoginRequest): Promise<void> {
            const response: Response = await fetch("http://localhost:8081/apiLogin", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': loginRequest.email,
                    'password': loginRequest.password,
                    'role': loginRequest.role,
                }),
            });

            if (response.ok) {
                const data: LoginResponse = await response.json();
                console.log(data);
                if (data) {
                    this.xsrfToken = Cookies.get('XSRF-TOKEN');
                    this.userGUID = data.userGUID;
                    localStorage.setItem('userGUID', data.userGUID);
                    this.role = data.role;
                    this.email = data.email;
                    // localStorage.setItem('expirationTimestamp', new Date().getTime() + data.tokenDuration)
                    await router.replace('/')
                }
            } else {
                console.log(response);
            }
        },
        async logout(): Promise<void> {
            await fetch('http://localhost:8081/apiLogout', {
                method: 'POST',
                credentials: 'include'
            })
            this.xsrfToken = '';
            this.userGUID = '';
            localStorage.removeItem('userGUID');
            this.role = '';
            this.email = '';
        }
    },
})
