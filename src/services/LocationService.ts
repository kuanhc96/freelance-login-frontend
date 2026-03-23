import resourceServerClient from "@/services/clients/apiClient";
import {LOCATIONS_ENDPOINT} from "@/store";
import {CreateLocationRequest} from "@/dto/request/createLocationRequest";
import {CreateLocationResponse} from "@/dto/response/createLocationResponse";
import {GetLocationResponse} from "@/dto/response/getLocationResponse";

export default {
    createLocation(userGUID: string, locationName: string, country: string, city: string, street: string, zipcode: string): Promise<CreateLocationResponse> {
        const createLocationRequest: CreateLocationRequest = {
            userGUID: userGUID,
            locationName: locationName,
            country: country,
            city: city,
            street: street,
            zipCode: zipcode
        }
        return resourceServerClient.post(LOCATIONS_ENDPOINT, createLocationRequest);
    },
    getLocationsByUserGUID(userGUID: string): Promise<GetLocationResponse[]> {
        return resourceServerClient.get(LOCATIONS_ENDPOINT + '/' + userGUID);
    }
}
