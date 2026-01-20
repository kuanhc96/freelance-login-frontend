import { createPinia } from 'pinia';
import router from '@/router/router';
import {markRaw} from "vue";

const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

export default pinia;

export const FREELANCE_RESOURCE_BACKEND: string = 'http://localhost:8072/freelance-resource-backend'
export const FREELANCE_AUTHSERVER: string = 'http://localhost:8072/freelance-authserver'
export const USERS_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + '/users';
export const SUBSCRIPTION_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND +'/subscriptions';
export const SUBSCRIBED_INSTRUCTORS_ENDPOINT: string = SUBSCRIPTION_ENDPOINT + '/instructors';
export const UNSUBSCRIBED_INSTRUCTORS_ENDPOINT: string = SUBSCRIPTION_ENDPOINT + '/unsubscribed';
export const SUBSCRIBED_STUDENTS_ENDPOINT: string = SUBSCRIPTION_ENDPOINT + '/students';
export const ANNOUNCEMENTS_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + "/announcements";
export const SUBJECTS_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + "/subjects";
export const LESSONS_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + "/lessons";
export const PACKAGES_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + "/packages";
export const PACKAGES_BY_SUBJECT_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + PACKAGES_ENDPOINT + "/subjects";
export const TRANSACTIONS_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + "/transactions";
export const LOCATIONS_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + "/locations";
export const TOKEN_ENDPOINT: string = FREELANCE_AUTHSERVER + "/oauth/tokens";
