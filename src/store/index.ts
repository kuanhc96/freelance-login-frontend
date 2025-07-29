import { createPinia } from 'pinia';
import router from '@/router/router';
import {markRaw} from "vue";

const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

export default pinia;

export const SUBSCRIBED_INSTRUCTORS_ENDPOINT: string = 'http://localhost:8081/subscription/instructors/';
export const UNSUBSCRIBED_INSTRUCTORS_ENDPOINT: string = 'http://localhost:8081/subscription/unsubscribed/';
export const SUBSCRIBED_STUDENTS_ENDPOINT: string = 'http://localhost:8081/subscription/students/';
export const ANNOUNCEMENTS_ENDPOINT: string =  "http://localhost:8081/announcements/";
export const SUBJECTS_ENDPOINT: string =  "http://localhost:8081/subjects/";
export const LESSONS_ENDPOINT: string =  "http://localhost:8081/lessons?";
export const PACKAGES_ENDPOINT: string =  "http://localhost:8081/packages/";
export const PACKAGES_BY_SUBJECT_ENDPOINT: string =  PACKAGES_ENDPOINT + "subject/";
export const TRANSACTIONS_ENDPOINT: string =  "http://localhost:8081/transactions/";
export const LOCATIONS_ENDPOINT: string =  "http://localhost:8081/locations/";

