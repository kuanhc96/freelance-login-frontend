import {GetUserResponse} from '@/dto/response/getUserResponse'
import {defineStore} from "pinia";
import {SUBSCRIBED_INSTRUCTORS_ENDPOINT, UNSUBSCRIBED_INSTRUCTORS_ENDPOINT} from "@/store";
import {useLoginStore} from "@/store/login";

export interface InstructorsState {
    subscribedInstructors: GetUserResponse[]
    unsubscribedInstructors: GetUserResponse[]
}

export const useInstructorsStore = defineStore('instructors', {
    state: (): InstructorsState => ({
        subscribedInstructors: [],
        unsubscribedInstructors: []
    }),
    getters: {
        getSubscribedInstructors: state => state.subscribedInstructors,
        hasSubscribedInstructors: state => state.subscribedInstructors && state.subscribedInstructors.length > 0,
        getUnsubscribedInstructors: state => state.unsubscribedInstructors,
        hasUnsubscribedInstructors: state => state.unsubscribedInstructors && state.unsubscribedInstructors.length > 0,
        getAllInstructors: state => state.subscribedInstructors.concat(state.unsubscribedInstructors),
        hasAllInstructors: state => state.subscribedInstructors.concat(state.unsubscribedInstructors).length > 0,

    },
    actions: {
        async setSubscribedInstructors() {
            const loginStore = useLoginStore();
            const subscriptionResponse: Response = await fetch(SUBSCRIBED_INSTRUCTORS_ENDPOINT + loginStore.getUserGUID, {
                method: 'GET',
                credentials: 'include'
            })

            if (subscriptionResponse.ok) {
                this.subscribedInstructors = await subscriptionResponse.json();
            }
        },
        async setUnsubscribedInstructors() {
            const loginStore = useLoginStore();
            const unsubscribedResponse: Response = await fetch(UNSUBSCRIBED_INSTRUCTORS_ENDPOINT + loginStore.getUserGUID, {
                method: 'GET',
                credentials: 'include'
            })
            if (unsubscribedResponse.ok) {
                this.unsubscribedInstructors = await unsubscribedResponse.json();
            }
        },
        async setInstructors() {
            await this.setSubscribedInstructors();
            await this.setUnsubscribedInstructors();
        },
        async setInstructorsOrStudents() {
            const loginStore = useLoginStore();
            if (loginStore.isStudent) {
                await this.setInstructors();
            } else {
                // TODO: refresh students
            }
        }
    },
})
