import { createPinia } from 'pinia';
import router from '@/router/router';
import {markRaw} from "vue";

const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

export default pinia;

export const FREELANCE_RESOURCE_BACKEND: string = 'http://localhost:8072/freelance'
export const FREELANCE_AUTHSERVER: string = 'http://localhost:8072/freelance-authserver'
export const USERS_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + '/user';
export const SUBSCRIPTION_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND +'/subscription';
export const SUBSCRIBED_INSTRUCTORS_ENDPOINT: string = SUBSCRIPTION_ENDPOINT + '/instructor';
export const UNSUBSCRIBED_INSTRUCTORS_ENDPOINT: string = SUBSCRIPTION_ENDPOINT + '/unsubscribed';
export const SUBSCRIBED_STUDENTS_ENDPOINT: string = SUBSCRIPTION_ENDPOINT + '/student';
export const ANNOUNCEMENTS_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + "/announcement";
export const SUBJECTS_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + "/subject";
export const LESSONS_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + "/lesson";
export const PACKAGES_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + "/package";
export const PACKAGES_BY_SUBJECT_ENDPOINT: string =  PACKAGES_ENDPOINT + "/subject";
export const TRANSACTIONS_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + "/transaction";
export const LOCATIONS_ENDPOINT: string = FREELANCE_RESOURCE_BACKEND + "/location";
