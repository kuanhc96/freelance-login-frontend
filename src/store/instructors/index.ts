import { GetUserResponse } from '@/dto/response/getUserResponse'
import { ActionTree, MutationTree, GetterTree, Module } from 'vuex'
import { RootState } from '@/store/types'

export interface InstructorsState {
    subscribedInstructors: Array<GetUserResponse>
    unsubscribedInstructors: Array<GetUserResponse>
    allInstructors: Array<GetUserResponse>
}

const state: InstructorsState = {
    subscribedInstructors: [],
    unsubscribedInstructors: [],
    allInstructors: []
}

const mutations: MutationTree<InstructorsState> = {
    SET_SUBSCRIBED_INSTRUCTORS(state, subscribedInstructors: Array<GetUserResponse>) {
        state.subscribedInstructors = subscribedInstructors;
    },
    SET_UNSUBSCRIBED_INSTRUCTORS(state, unsubscribedInstructors: Array<GetUserResponse>) {
        state.unsubscribedInstructors = unsubscribedInstructors;
    },
    SET_ALL_INSTRUCTORS(state, allInstructors: Array<GetUserResponse>) {
        state.allInstructors = allInstructors;
    }
}

const actions: ActionTree<InstructorsState, RootState> = {
    setSubscribedInstructors( { commit }, subscribedInstructors: Array<GetUserResponse>) {
        commit('SET_SUBSCRIBED_INSTRUCTORS', subscribedInstructors);
    },
    setUnsubscribedInstructors( { commit }, unsubscribedInstructors: Array<GetUserResponse>) {
        commit('SET_UNSUBSCRIBED_INSTRUCTORS', unsubscribedInstructors);
    },
    setAllInstructors( { commit }, allInstructors: Array<GetUserResponse>) {
        commit('SET_ALL_INSTRUCTORS', allInstructors);
    }
}

const getters: GetterTree<InstructorsState, RootState> = {
    getSubscribedInstructors: state => state.subscribedInstructors,
    hasSubscribedInstructors: state => state.subscribedInstructors && state.subscribedInstructors.length > 0,
    getUnsubscribedInstructors: state => state.unsubscribedInstructors,
    hasUnsubscribedInstructors: state => state.unsubscribedInstructors && state.unsubscribedInstructors.length > 0,
    getAllInstructors: state => state.allInstructors,
    hasAllInstructors: state => state.allInstructors && state.allInstructors.length > 0,
}

export const instructors: Module<InstructorsState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}