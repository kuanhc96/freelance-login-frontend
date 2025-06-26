import { GetSubjectResponse } from '@/dto/response/getSubjectResponse';
import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import { RootState } from '@/store/types';

export interface SubjectsState {
    instructorGUIDToSubjectsMap: Map<string, Array<GetSubjectResponse>>
}

export interface AddSubjectPayload {
    instructorGUID: string
    subjects: Array<GetSubjectResponse>
}

const state: SubjectsState = {
    instructorGUIDToSubjectsMap: new Map()
}

const mutations: MutationTree<SubjectsState> = {
    ADD_SUBJECTS(state, payload: AddSubjectPayload) {
        const { instructorGUID, subjects } = payload
        state.instructorGUIDToSubjectsMap.set(instructorGUID, subjects);
    }
}

const actions: ActionTree<SubjectsState, RootState> = {
    addSubjects({ commit }, payload: AddSubjectPayload) {
        commit('ADD_SUBJECTS', payload);
    }
}

const getters: GetterTree<SubjectsState, RootState> = {
    getSubjectsByInstructorGUID: (state) => (instructorGUID: string) => state.instructorGUIDToSubjectsMap.get(instructorGUID),
    hasSubjectsByInstructorGUID: (state) => (instructorGUID: string) => {
        const list = state.instructorGUIDToSubjectsMap.get(instructorGUID);
        return !((Array.isArray(list)) && list.length > 0);
    }
}

export const subjects: Module<SubjectsState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}