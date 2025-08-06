<script lang="ts">
import {computed, defineComponent, Ref} from 'vue'
import {GetLocationResponse} from "@/dto/response/getLocationResponse";
import {useLocationsStore} from "@/store/locations";
import LocationDetailsModal from "@/components/locations/LocationDetailsModal.vue";
import SubjectDetailsModal from "@/components/subjects/SubjectDetailsModal.vue";
import AddLocationModal from "@/components/locations/AddLocationModal.vue";
import AddSubjectModal from "@/components/subjects/AddSubjectModal.vue";
import AddPackageModal from "@/components/packages/AddPackageModal.vue";
import PackageDetailsModal from "@/components/packages/PackageDetailsModal.vue";
import {useSubjectsStore} from "@/store/subjects";
import {GetSubjectResponse} from "@/dto/response/getSubjectResponse";
import {GetUserResponse} from "@/dto/response/getUserResponse";
import {useLoginStore} from "@/store/login";
import {useInstructorsOrStudentsStore} from "@/store/instructorsOrStudents";
import {usePackagesStore} from "@/store/packages";
export default defineComponent({
    name: 'ProfilePage',
    components: {
        PackageDetailsModal,
        LocationDetailsModal,
        SubjectDetailsModal,
        AddLocationModal,
        AddSubjectModal,
        AddPackageModal
    },
    setup() {
        const locationsStore = useLocationsStore();
        const subjectsStore = useSubjectsStore();
        const loginStore = useLoginStore();
        const usersStore = useInstructorsOrStudentsStore();
        const packagesStore = usePackagesStore();

        const preferredLocations: Ref<GetLocationResponse[]> = computed(function() {
            return locationsStore.getLocationsByUserGUID(loginStore.userGUID);
        })

        const subjects: Ref<GetSubjectResponse[]> = computed(function() {
            return subjectsStore.getSubjectsByInstructorGUID(loginStore.getUserGUID);
        })

        const isStudent: Ref<boolean> = computed(function() {
            return loginStore.isStudent;
        })

        const myInfo: Ref<GetUserResponse | null> = computed(function() {
            return usersStore.getMyInfo;
        })

        function getPackages(subjectGUID: string) {
            return packagesStore.getPackagesBySubjectGUID(subjectGUID);
        }

        return {
            preferredLocations,
            subjects,
            isStudent,
            myInfo,
            getPackages
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
                            <div class="d-flex justify-content-around align-items-center">
                                <div class="portrait-img rounded-circle overflow-hidden border" style="width:250px; height:250px;">
                                    <img :src="myInfo.profilePicture" alt="portrait" class="h-100 w-100 object-fit-cover">
                                </div>
                                <div class="d-flex justify-content-center align-items-center flex-column gap-3">
                                    <div class="d-flex">
                                        <div class="display-5">
                                            {{myInfo.name}}
                                        </div>
                                        <span>
                                            <i class="fa-solid fa-venus"></i>
                                        </span>
                                    </div>
                                    <p>
                                        <i class="fa-solid fa-envelope"></i>
                                        {{myInfo.email}}
                                    </p>
                                    <p>
                                        <i class="fa-solid fa-cake-candles"></i>
                                        {{myInfo.birthday}}
                                    </p>
                                    <p>{{myInfo.description}}</p>
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
                                    <add-subject-modal></add-subject-modal>
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
                                    ></add-package-modal>
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
