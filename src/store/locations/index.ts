import {GetLocationResponse} from "@/dto/response/getLocationResponse";
import {defineStore} from "pinia";
import {useLoginStore} from "@/store/login";
import {LOCATIONS_ENDPOINT} from "@/store";

export interface LocationsState {
    locations: GetLocationResponse[]
}

export const useLocationsStore = defineStore('locations', {
    state: (): LocationsState => ({
        locations: []
    }),
    getters: {
        getLocations: (state) => state.locations,
        hasLocations: (state) => state.locations.length > 0,
    },
    actions: {
        async setLocations() {
            const loginStore = useLoginStore();
            const response: Response = await fetch(LOCATIONS_ENDPOINT + loginStore.getUserGUID, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                this.locations = await response.json();
            }
        }
    }
})
