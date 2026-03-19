import { defineStore } from 'pinia';
import {useLessonsStore} from "@/store/lessons";
import {useAnnouncementsStore} from "@/store/announcements";
import {useSubjectsStore} from "@/store/subjects";
import {usePackagesStore} from "@/store/packages";
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";
import {useTransactionsStore} from "@/store/transactions";
import {useLocationsStore} from "@/store/locations";
import {LOGIN_ENDPOINT} from "@/store";
import LoginService from "@/services/LoginService";

export interface LoginState {
    // xsrfToken: string
    userGUID: string
    email: string
    role: string
    didAutoLogout: boolean
}

let timer: number;

export const useLoginStore = defineStore('login', {
    state: (): LoginState => ({
        // xsrfToken: Cookies.get('XSRF-TOKEN') || '',
        userGUID: sessionStorage.getItem('userGUID') || '',
        // expirationTimestamp: localStorage.getItem('expirationTimestamp') || '0',
        email: sessionStorage.getItem('email') || '',
        role: sessionStorage.getItem('role') || '',
        didAutoLogout: false
    }),
    getters: {
        isLoggedIn: (state) => {
            return !!state.userGUID?.trim() && !!state.email?.trim() && !!state.role?.trim() // && !!state.xsrfToken?.trim()
        },
        // getXsrfToken: state => state.xsrfToken,
        getUserGUID: state => state.userGUID,
        getRole: state => state.role,
        isStudent: state => state.role === 'STUDENT',
        getEmail: state => state.email,
        getDidAutoLogout: state => state.didAutoLogout
    },
    actions: {
        async checkLogin(): Promise<void> {
            LoginService.checkLogin()
                .then((res) => {
                    const data = res.data;
                    if (data) {
                        sessionStorage.setItem('email', data.email);
                        sessionStorage.setItem('role', data.role);
                        sessionStorage.setItem('userGUID', data.userGUID);
                        // this.xsrfToken = Cookies.get('XSRF-TOKEN');
                        this.role = data.role;
                        this.email = data.email;
                        this.userGUID = data.userGUID;
                        // const expiresIn = +this.expirationTimestamp - new Date().getTime();
                        // if (expiresIn < 0) {
                        //     return;
                        // }
                        //
                        // timer = setTimeout(async() => {
                        //     await this.autoLogout();
                        // }, expiresIn);
                        //
                        // if (this.isLoggedIn) {
                        //     await this.setup();
                        //     await router.replace('/')
                        // } else {
                        //     this.login();
                        // }
                    }
                })
                .catch(() => {
                    this.login();
                });
        },
        login(): void {
            window.location.href = LOGIN_ENDPOINT;
        },
        async logout(): Promise<void> {
            LoginService.logout()
                .then(() => {
                    sessionStorage.setItem('email', '');
                    sessionStorage.setItem('role', '');
                    sessionStorage.setItem('userGUID', '');
                    this.role = '';
                    this.email = '';
                    this.userGUID = '';
                    // // this.xsrfToken = '';
                    // this.role = '';
                    // this.email = '';
                    // this.userGUID = '';
                    // // clearTimeout(timer);
                    this.login();
                });
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
