import { LoginResponse } from '@/dto/response/loginResponse';
// import { LoginRequest } from '@/dto/request/loginRequest';
import { defineStore } from 'pinia';
import Cookies from "js-cookie";
import router from "@/router/router";
import {useLessonsStore} from "@/store/lessons";
import {useAnnouncementsStore} from "@/store/announcements";
import {useSubjectsStore} from "@/store/subjects";
import {usePackagesStore} from "@/store/packages";
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";
import {useTransactionsStore} from "@/store/transactions";
import {useLocationsStore} from "@/store/locations";
// import {useOAuthClient} from "@volverjs/auth-vue";

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
        // async login(): Promise<void> {
        //     const authClient = useOAuthClient();
        //     await authClient.initialize();
        //     await authClient.authorize();
        // },
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
            await instructorsStore.setInstructorsOrStudents();

            const subjectsStore = useSubjectsStore();
            await subjectsStore.setSubjects();

            const announcementsStore = useAnnouncementsStore();
            await announcementsStore.setAnnouncements();

            const lessonsStore = useLessonsStore();
            await lessonsStore.setLessons();

            const packagesStore = usePackagesStore();
            await packagesStore.setPackages();

            const transactionsStore = useTransactionsStore();
            await transactionsStore.setTransactions();

            const locationsStore = useLocationsStore();
            await locationsStore.setLocations();
        }
    },
})
