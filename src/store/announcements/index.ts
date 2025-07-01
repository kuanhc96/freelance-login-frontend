import { GetAnnouncementResponse } from '@/dto/response/getAnnouncementResponse';
import { ActionTree, MutationTree, GetterTree, Module } from 'vuex';
import { RootState } from '@/store/types';

export interface AnnouncementsState {
    announcements: GetAnnouncementResponse[]
}

const state: AnnouncementsState = {
    announcements: []
}

const mutations: MutationTree<AnnouncementsState> = {
    SET_ANNOUNCEMENTS(state, announcements: GetAnnouncementResponse[]) {
        state.announcements = announcements;
    }
}

const actions: ActionTree<AnnouncementsState, RootState> = {
    setAnnouncements({ commit }, announcements: GetAnnouncementResponse[]) {
        commit('SET_ANNOUNCEMENTS', announcements);
    }
}

const getters: GetterTree<AnnouncementsState, RootState> = {
    getAnnouncements: state => state.announcements
}

export const announcements: Module<AnnouncementsState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}