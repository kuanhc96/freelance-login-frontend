import {GetUserResponse} from '@/dto/response/getUserResponse'
import {defineStore} from "pinia";
import {
    SUBSCRIBED_INSTRUCTORS_ENDPOINT,
    SUBSCRIBED_STUDENTS_ENDPOINT,
    UNSUBSCRIBED_INSTRUCTORS_ENDPOINT, USERS_ENDPOINT
} from "@/store";
import {useLoginStore} from "@/store/login";

export interface InstructorsState {
    subscribedInstructors: GetUserResponse[]
    unsubscribedInstructors: GetUserResponse[]
    myStudents: GetUserResponse[]
    myInfo: GetUserResponse | null
}

export const useInstructorsOrStudentsStore = defineStore('instructorsOrStudents', {
    state: (): InstructorsState => ({
        subscribedInstructors: [],
        unsubscribedInstructors: [],
        myStudents: [],
        myInfo: null
    }),
    getters: {
        getSubscribedInstructors: state => state.subscribedInstructors,
        hasSubscribedInstructors: state => state.subscribedInstructors && state.subscribedInstructors.length > 0,
        getUnsubscribedInstructors: state => state.unsubscribedInstructors,
        hasUnsubscribedInstructors: state => state.unsubscribedInstructors && state.unsubscribedInstructors.length > 0,
        getAllInstructors: state => state.subscribedInstructors.concat(state.unsubscribedInstructors),
        hasAllInstructors: state => state.subscribedInstructors.concat(state.unsubscribedInstructors).length > 0,
        getMyStudents: state => state.myStudents,
        getMyInfo: state => state.myInfo
    },
    actions: {
        async setMyInfo() {
            const loginStore = useLoginStore();
            const myInfoResponse: Response = await fetch(USERS_ENDPOINT + loginStore.getUserGUID, {
                method: 'GET',
                credentials: 'include'
            });

            if (myInfoResponse.ok) {
                this.myInfo = await myInfoResponse.json();
            }

        },
        async setMyStudents() {
            const loginStore = useLoginStore();
            if (!loginStore.isStudent) {
                const myStudentsResponse: Response = await fetch(SUBSCRIBED_STUDENTS_ENDPOINT + loginStore.getUserGUID, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (myStudentsResponse.ok) {
                    this.myStudents = await myStudentsResponse.json();
                }
            }

        },
        async setSubscribedInstructors() {
            const loginStore = useLoginStore();
            if (loginStore.isStudent) {
                const subscriptionResponse: Response = await fetch(SUBSCRIBED_INSTRUCTORS_ENDPOINT + loginStore.getUserGUID, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (subscriptionResponse.ok) {
                    this.subscribedInstructors = await subscriptionResponse.json();
                }
            }
        },
        async setUnsubscribedInstructors() {
            const loginStore = useLoginStore();
            if (!loginStore.isStudent) {
                const unsubscribedResponse: Response = await fetch(UNSUBSCRIBED_INSTRUCTORS_ENDPOINT + loginStore.getUserGUID, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (unsubscribedResponse.ok) {
                    this.unsubscribedInstructors = await unsubscribedResponse.json();
                }
            }
        },
        async setInstructors() {
            await this.setSubscribedInstructors();
            await this.setUnsubscribedInstructors();
        },
        async setInstructorsOrStudents() {
            const loginStore = useLoginStore();
            await this.setMyInfo();
            if (loginStore.isStudent) {
                await this.setInstructors();
            } else {
                await this.setMyStudents();
            }
        }
    },
})
