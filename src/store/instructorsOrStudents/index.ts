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
        setMyInfo() {
            const loginStore = useLoginStore();
            UserService.getUserInfo(loginStore.getUserGUID).then((res) => {
                this.myInfo = res.data;
            })

        },
        setMyStudents() {
            const loginStore = useLoginStore();
            if (!loginStore.isStudent) {
                SubscriptionService.getSubscribedStudents(loginStore.getUserGUID)
                    .then((res) => {
                        this.myStudents = res.data;
                    })
            }

        },
        setSubscribedInstructors() {
            const loginStore = useLoginStore();
            if (loginStore.isStudent) {
                SubscriptionService.getSubscribedInstructors(loginStore.getUserGUID)
                    .then((res) => {
                        this.subscribedInstructors = res.data;
                    })
            }
        },
        setUnsubscribedInstructors() {
            const loginStore = useLoginStore();
            if (loginStore.isStudent) {
                SubscriptionService.getUnsubscribedInstructors(loginStore.getUserGUID)
                    .then((res) => {
                        this.unsubscribedInstructors = res.data;
                    })
            }
        },
        setInstructors() {
            this.setSubscribedInstructors();
            this.setUnsubscribedInstructors();
        },
        setInstructorsOrStudents() {
            const loginStore = useLoginStore();
            this.setMyInfo();
            if (loginStore.isStudent) {
                this.setInstructors();
            } else {
                this.setMyStudents();
            }
        }
    },
})
