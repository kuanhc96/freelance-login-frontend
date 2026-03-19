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

            LocationService.getLocationsByUserGUID(loginStore.getUserGUID)
                .then((res) => {
                this.userGUIDToLocationsMap[loginStore.getUserGUID] = res.data;
            });

            let subscribers: GetUserResponse[];
            if (loginStore.isStudent) {
                subscribers = instructorsStore.getSubscribedInstructors;
            } else {
                subscribers = instructorsStore.getMyStudents;
            }

            for (const subscriber of subscribers) {
                LocationService.getLocationsByUserGUID(subscriber.userGUID)
                    .then((res) => {
                        this.userGUIDToLocationsMap[subscriber.userGUID] = res.data;
                    });
            }
        }
    }
})
