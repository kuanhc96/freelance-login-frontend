import {GetUserResponse} from '@/dto/response/getUserResponse'
import {defineStore} from "pinia";
import {useLoginStore} from "@/store/login";
import UserService from "@/services/UserService";
import SubscriptionService from "@/services/SubscriptionService";

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
            this.myInfo = await UserService.getUserInfo(loginStore.getUserGUID);

        },
        async setMyStudents() {
            const loginStore = useLoginStore();
            if (!loginStore.isStudent) {
                this.myStudents = await SubscriptionService.getSubscribedStudents(loginStore.getUserGUID);
            }

        },
        async setSubscribedInstructors() {
            const loginStore = useLoginStore();
            if (loginStore.isStudent) {
                this.subscribedInstructors = await SubscriptionService.getSubscribedInstructors(loginStore.getUserGUID);
            }
        },
        async setUnsubscribedInstructors() {
            const loginStore = useLoginStore();
            if (loginStore.isStudent) {
                this.unsubscribedInstructors = await SubscriptionService.getUnsubscribedInstructors(loginStore.getUserGUID);
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
