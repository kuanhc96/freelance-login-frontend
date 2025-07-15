import { LoginResponse } from '@/dto/response/loginResponse';
import { LoginRequest } from '@/dto/request/loginRequest';
import { defineStore } from 'pinia';
import Cookies from "js-cookie";
import router from "@/router/router";
import {useLessonsStore} from "@/store/lessons";
import {useAnnouncementsStore} from "@/store/announcements";
import {useSubjectsStore} from "@/store/subjects";
import {usePackagesStore} from "@/store/packages";
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";

export interface LoginState {
    xsrfToken: string
    userGUID: string
    email: string
    role: string
    expirationTimestamp: string
    didAutoLogout: boolean
}

let timer: number;

export const useLoginStore = defineStore('login', {
    state: (): LoginState => ({
        xsrfToken: Cookies.get('XSRF-TOKEN') || '',
        userGUID: localStorage.getItem('userGUID') || '',
        expirationTimestamp: localStorage.getItem('expirationTimestamp') || '0',
        email: '',
        role: '',
        didAutoLogout: false
    }),
    getters: {
        isLoggedIn: (state) => {
            return !!state.userGUID?.trim() && !!state.xsrfToken?.trim() && state.expirationTimestamp !== '0'
        },
        getXsrfToken: state => state.xsrfToken,
        getUserGUID: state => state.userGUID,
        getRole: state => state.role,
        isStudent: state => state.role === 'STUDENT',
        getEmail: state => state.email,
        getDidAutoLogout: state => state.didAutoLogout
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
                        const expiresIn = +this.expirationTimestamp - new Date().getTime();
                        if (expiresIn < 0) {
                            return;
                        }

                        timer = setTimeout(async() => {
                            await this.autoLogout();
                        }, expiresIn);

                        await this.setup();
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
                if (data) {
                    this.xsrfToken = Cookies.get('XSRF-TOKEN');
                    this.userGUID = data.userGUID;
                    localStorage.setItem('userGUID', data.userGUID);
                    this.role = data.role;
                    this.email = data.email;
                    // localStorage.setItem('expirationTimestamp', new Date().getTime() + data.tokenDuration)
                    localStorage.setItem("expirationTimestamp", '' + data.expirationTimestamp);
                    this.expirationTimestamp = '' + data.expirationTimestamp;
                    timer = setTimeout(async () => {
                        await this.autoLogout();
                    }, data.expirationTimestamp - new Date().getTime())
                    await this.setup();
                    await router.replace('/');
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
            this.role = '';
            this.email = '';
            this.expirationTimestamp = '0';
            localStorage.removeItem('userGUID');
            localStorage.removeItem('expirationTimestamp');
            clearTimeout(timer);
            await router.replace('/login');
        },
        async autoLogout(): Promise<void> {
            this.didAutoLogout = true;
            await this.logout();
        },
        closeAutoLogout(): void {
            this.didAutoLogout = false;
        },
        async setup(): Promise<void> {
            const instructorsStore = useInstructorsOrStudentsStore();
            const subjectsStore = useSubjectsStore();
            const announcementsStore = useAnnouncementsStore();
            const lessonsStore = useLessonsStore();
            const packagesStore = usePackagesStore();

            await instructorsStore.setInstructors();
            await subjectsStore.setSubjects();
            await announcementsStore.setAnnouncements();
            await lessonsStore.setLessons();
            await packagesStore.setPackages();
        }
    },
})
