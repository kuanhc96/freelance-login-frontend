import { GetUserResponse } from '@/dto/response/getUserResponse'
import { ActionTree, MutationTree, GetterTree, Module } from 'vuex'
import { RootState } from '@/store/types'
import {defineStore} from "pinia";

export interface InstructorsState {
    subscribedInstructors: GetUserResponse[]
    unsubscribedInstructors: GetUserResponse[]
    allInstructors: GetUserResponse[]
}

export const useInstructorsStore = defineStore('instructors', {
    state: (): InstructorsState => ({
        subscribedInstructors: [],
        unsubscribedInstructors: [],
        allInstructors: []
    }),
    getters: {
        getSubscribedInstructors: state => state.subscribedInstructors,
        hasSubscribedInstructors: state => state.subscribedInstructors && state.subscribedInstructors.length > 0,
        getUnsubscribedInstructors: state => state.unsubscribedInstructors,
        hasUnsubscribedInstructors: state => state.unsubscribedInstructors && state.unsubscribedInstructors.length > 0,
        getAllInstructors: state => state.allInstructors,
        hasAllInstructors: state => state.allInstructors && state.allInstructors.length > 0,

    },
    actions: {
        setSubscribedInstructors(subscribedInstructors: GetUserResponse[]) {
            this.subscribedInstructors = subscribedInstructors;
        },
        setUnsubscribedInstructors(unsubscribedInstructors: GetUserResponse[]) {
            this.unsubscribedInstructors = unsubscribedInstructors;
        },
        setAllInstructors(allInstructors: GetUserResponse[]) {
            this.allInstructors = allInstructors;
        }
    },
})
