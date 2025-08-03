<script lang="ts">
import {defineComponent, ref, Ref} from "vue";
import Cookies from "js-cookie";
import {CreateLocationRequest} from "@/dto/request/createLocationRequest";
import {useLoginStore} from "@/store/login";
import {useLocationsStore} from "@/store/locations";

export default defineComponent({
    name: "AddLocationModal" ,
    setup() {
        const loginStore = useLoginStore();

        const locationName: Ref<string> = ref('');
        const country: Ref<string> = ref('');
        const city: Ref<string> = ref('');
        const street: Ref<string> = ref('');
        const zip: Ref<string> = ref('');

        async function submit() {
            const csrfToken = Cookies.get('XSRF-TOKEN');
            const createLocationRequest: CreateLocationRequest = {
                userGUID: loginStore.getUserGUID,
                locationName: locationName.value,
                country: country.value,
                city: city.value,
                street: street.value,
                zipCode: zip.value,

            }
            const response: Response = await fetch('http://localhost:8081/locations/createLocation', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken
                },
                body: JSON.stringify( createLocationRequest )
            })

            if (response.ok) {
                const locationStore = useLocationsStore();
                await locationStore.setLocations();
            }

        }

        return {
            locationName,
            country,
            city,
            street,
            zip,
            submit
        }
    }
})

</script>

<template>
    <span
        class="badge btn text-bg-primary text-dark fs-7 mx-2"
        data-bs-target="#addLocationModal"
        data-bs-toggle="modal"
    >
        + Add
    </span>
    <div class="modal fade" id="addLocationModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">New Preferred Location</h1>
                    <button class="btn btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="row m-3">
                            <div class="d-flex justify-content-between">
                                <label for="locationNameInput">Location Name</label>
                                <input
                                    type="text"
                                    id="locationNameInput"
                                    class="form-control"
                                    placeholder="My Apartment"
                                    v-model="locationName"
                                />
                            </div>
                        </div>
                        <div class="row m-3">
                            <div class="d-flex">
                                <div class="">
                                    <label for="street">street</label>
                                    <input
                                        type="text"
                                        id="street"
                                        class="form-control"
                                        placeholder="Street"
                                        v-model="street"
                                    />
                                </div>
                                <div class="">
                                    <label for="city">city</label>
                                    <input
                                        type="text"
                                        id="city"
                                        class="form-control"
                                        placeholder="Taipei"
                                        v-model="city"
                                    />
                                </div>
                                <div class="">
                                    <label for="country">Country</label>
                                    <input
                                        type="text"
                                        id="country"
                                        class="form-control"
                                        placeholder="Taiwan"
                                        v-model="country"
                                    />
                                </div>
                                <div class="">
                                    <label for="zip">Zip</label>
                                    <input
                                        type="text"
                                        id="zip"
                                        class="form-control"
                                        placeholder="100"
                                        v-model="zip"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <button class="btn btn-primary" type="button" @click="submit">Submit</button>
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>
