<script lang="ts">
import {computed, defineComponent, Ref} from 'vue'
import {GetLocationResponse} from "@/dto/response/getLocationResponse";
import {useLocationsStore} from "@/store/locations";
import LocationDetailsModal from "@/components/locations/LocationDetailsModal.vue";
import AddLocationModal from "@/components/locations/AddLocationModal.vue";
export default defineComponent({
    name: 'ProfilePage',
    components: {
        LocationDetailsModal,
        AddLocationModal
    },
    setup() {
        const locationsStore = useLocationsStore();
        const preferredLocations: Ref<GetLocationResponse[]> = computed(function() {
            return locationsStore.getLocations;
        })

        return {
            preferredLocations
        }
    }
})

</script>

<template>
    <section>
        <base-card
            card-title="Profile"
        >
            <div class="card shadow m-4">
                <div class="card-body">
                    <div class="d-flex flex-column align-items-center justify-content-center">
                        <div class="row col-md-12 col-12 m-3">
                            <div class="d-flex justify-content-center align-items-center">
                                <div class="portrait-img rounded-circle overflow-hidden border" style="width:250px; height:250px;">
                                    <img src="/alice.jpg" alt="portrait" class="h-100 w-100 object-fit-cover">
                                </div>
                            </div>
                        </div>
                        <div class="row col-md-12 col-12 m-3">
                            <div class="d-flex justify-content-between">
                                <h5>Preferred Locations:</h5>
                                <div class="">
                                    <!--                            modal button for location details -->
                                    <location-details-modal
                                        v-for="location in preferredLocations"
                                        :key="location.locationGUID"
                                        :location="location"
                                    > </location-details-modal>
                                    <span v-if="preferredLocations.length > 2" class="fs-6"> ... </span>
                                    <add-location-modal></add-location-modal>
                                </div>
                            </div>
                        </div>
                        <div class="row col-md-12 col-12 m-3">
                            <div class="d-flex justify-content-between">
                                <h5>Available Subjects:</h5>
                                <div class="">
                                    <!--                            modal button for location details -->
                                    <location-details-modal
                                        v-for="location in preferredLocations"
                                        :key="location.locationGUID"
                                        :location="location"
                                    > </location-details-modal>
                                    <span v-if="preferredLocations.length > 2" class="fs-6"> ... </span>
                                    <add-location-modal></add-location-modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </base-card>
    </section>
</template>

<style scoped>

</style>
