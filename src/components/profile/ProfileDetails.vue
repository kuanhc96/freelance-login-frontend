<script setup lang="ts">

import PackageDetailsModal from "@/components/packages/PackageDetailsModal.vue";
import AddSubjectModal from "@/components/subjects/AddSubjectModal.vue";
import LocationDetailsModal from "@/components/locations/LocationDetailsModal.vue";
import AddLocationModal from "@/components/locations/AddLocationModal.vue";
import SubjectDetailsModal from "@/components/subjects/SubjectDetailsModal.vue";
import AddPackageModal from "@/components/packages/AddPackageModal.vue";
import {defineProps, PropType, Ref, computed, provide} from "vue";
import {GetUserResponse} from "@/dto/response/getUserResponse";
import {GetLocationResponse} from "@/dto/response/getLocationResponse";
import {GetSubjectResponse} from "@/dto/response/getSubjectResponse";
import {useLoginStore} from "@/store/login";
import {useLocationsStore} from "@/store/locations";
import {usePackagesStore} from "@/store/packages";
import {useSubjectsStore} from "@/store/subjects";

const loginStore = useLoginStore();
const subjectsStore = useSubjectsStore();
const locationsStore = useLocationsStore();
const packagesStore = usePackagesStore();

const props = defineProps({
    userInfo: {
        type: Object as PropType<GetUserResponse>,
        required: true
    },
    disableToggle: {
        type: Boolean,
        default: false
    }
});

provide('disableToggle', props.disableToggle);

const isStudent: Ref<boolean> = computed(() => {
    return props.userInfo.role === 'STUDENT';
});

const isMyProfile: Ref<boolean> = computed(() => {
    return props.userInfo.userGUID === loginStore.userGUID;
});

const subjects: Ref<GetSubjectResponse[]> = computed(() => {
    return subjectsStore.getSubjectsByInstructorGUID(props.userInfo.userGUID);
})

const preferredLocations: Ref<GetLocationResponse[]> = computed(function() {
    return locationsStore.getLocationsByUserGUID(props.userInfo.userGUID);
});

function getPackages(subjectGUID: string) {
    return packagesStore.getPackagesBySubjectGUID(subjectGUID);
}
</script>

<template>
    <div class="d-flex flex-column align-items-center justify-content-center">
        <div class="row col-md-12 col-12 m-3">
            <div class="d-flex justify-content-around align-items-center">
                <div class="portrait-img rounded-circle overflow-hidden border" style="width:250px; height:250px;">
                    <img :src="props.userInfo.profilePicture" alt="portrait" class="h-100 w-100 object-fit-cover">
                </div>
                <div class="d-flex justify-content-center align-items-center flex-column gap-3">
                    <div class="d-flex">
                        <div class="display-5">
                            {{props.userInfo.name}}
                        </div>
                        <span>
                            <i
                                class="fa-solid fa-venus"
                                v-if="props.userInfo.gender === 'FEMALE'"
                            ></i>
                            <i
                                class="fa-solid fa-mars"
                                v-else
                            ></i>
                        </span>
                    </div>
                    <p v-if="isMyProfile">
                        <i class="fa-solid fa-envelope"></i>
                        {{props.userInfo.email}}
                    </p>
                    <p v-if="isMyProfile">
                        <i class="fa-solid fa-cake-candles"></i>
                        {{props.userInfo.birthday}}
                    </p>
                    <p>{{props.userInfo.description}}</p>
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
                    <add-location-modal
                        v-if="isMyProfile"
                    ></add-location-modal>
                </div>
            </div>
        </div>
        <div
            class="row col-md-12 col-12 m-3"
            v-if="!isStudent"
        >
            <div class="d-flex justify-content-between">
                <h5>Available Subjects:</h5>
                <div class="">
                    <!--                            modal button for location details -->
                    <subject-details-modal
                        v-for="subject in subjects"
                        :key="subject.subjectGUID"
                        :subject="subject"
                    > </subject-details-modal>
                    <span v-if="subjects.length > 2" class="fs-6"> ... </span>
                    <add-subject-modal
                        v-if="isMyProfile "
                    ></add-subject-modal>
                </div>
            </div>
            <div class="my-3">
                <h5>Packages:</h5>
                <div
                    class="border rounded-3 p-3 my-2 d-flex gap-3"
                    v-for="subject in subjects"
                    :key="subject.subjectGUID"
                >
                    <subject-details-modal
                        :subject="subject"
                    ></subject-details-modal>
                    <package-details-modal
                        class="badge text-bg-light"
                        v-for="package_ in getPackages(subject.subjectGUID)"
                        :key="package_.packageGUID"
                        :package="package_"
                    >
                    </package-details-modal>
                    <add-package-modal
                        :subjectGUID="subject.subjectGUID"
                        v-if="isMyProfile"
                    ></add-package-modal>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
