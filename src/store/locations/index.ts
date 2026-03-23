import {GetLocationResponse} from "@/dto/response/getLocationResponse";
import {defineStore} from "pinia";
import {useLoginStore} from "@/store/login";
import {useInstructorsOrStudentsStore} from  "@/store/instructorsOrStudents"
import {LOCATIONS_ENDPOINT} from "@/store";
import {GetUserResponse} from "@/dto/response/getUserResponse";
import LocationService from "@/services/LocationService";

export interface LocationsState {
    userGUIDToLocationsMap: Record<string, GetLocationResponse[]>
}

export const useLocationsStore = defineStore('locations', {
    state: (): LocationsState => ({
        userGUIDToLocationsMap: {}
    }),
    getters: {
        getLocationsByUserGUID: (state) => (userGUID: string) => {
            if (userGUID in state.userGUIDToLocationsMap) {
                return state.userGUIDToLocationsMap[userGUID];
            } else {
                return [];
            }
        },
        hasLocationsByUserGUID: (state) => (userGUID: string) => {
            return state.userGUIDToLocationsMap[userGUID].length > 0;
        }
    },
    actions: {
        async setLocations() {
            const loginStore = useLoginStore();
            const instructorsStore = useInstructorsOrStudentsStore();

            this.userGUIDToLocationsMap[loginStore.getUserGUID] = await LocationService.getLocationsByUserGUID(loginStore.getUserGUID);

            let subscribers: GetUserResponse[];
            if (loginStore.isStudent) {
                subscribers = instructorsStore.getSubscribedInstructors;
            } else {
                subscribers = instructorsStore.getMyStudents;
            }

            for (const subscriber of subscribers) {
                this.userGUIDToLocationsMap[subscriber.userGUID] = await LocationService.getLocationsByUserGUID(subscriber.userGUID);
            }
        }
    }
})
