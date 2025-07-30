<script lang="ts">
import {defineComponent, PropType} from "vue";
import {GetLocationResponse} from "@/dto/response/getLocationResponse";

export default defineComponent({
    name: 'LocationDetailsModal',
    props: {
        location: {
            type: Object as PropType<GetLocationResponse>,
            required: true
        }
    },
})
</script>

<template>
    <span
        class="badge btn text-bg-secondary text-white fs-7 mx-2"
        :data-bs-target="'#modal' + location.locationGUID"
        data-bs-toggle="modal"
    >
        {{location.locationName}}
    </span>
    <div class="modal fade" :id="'modal'+location.locationGUID">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">{{location.locationName}}</h1>
                    <button class="btn btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    {{location.street}}, {{location.city}}, {{location.country}}
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>
