<script lang="ts">
import {computed, defineComponent, Ref} from 'vue'
import {GetLocationResponse} from "@/dto/response/getLocationResponse";
import {useLocationsStore} from "@/store/locations";
import LocationDetailsModal from "@/components/locations/LocationDetailsModal.vue";
export default defineComponent({
    name: 'ProfilePage',
    components: {
        LocationDetailsModal
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
            <div class="d-flex align-items-center justify-content-center">
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
                            <span class="badge btn text-bg-primary text-dark fs-7 mx-2">
                                + Add
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </base-card>
    </section>
</template>

<style scoped>

</style>
