<script lang="ts">
import {defineComponent, ref, Ref} from 'vue';
import {SUBJECTS_ENDPOINT} from "@/store";
import Cookies from "js-cookie";
import {CreateSubjectRequest} from "@/dto/request/createSubjectRequest";
import {useLoginStore} from "@/store/login";
import {useSubjectsStore} from "@/store/subjects";
import {useRouter} from "vue-router";
import SubjectService from "@/services/SubjectService";

export default defineComponent({
    name: 'SubjectRegistrationForm',
    setup() {
        const loginStore = useLoginStore();
        const subjectsStore = useSubjectsStore();
        const router = useRouter();
        const subjectName: Ref<string> = ref('');
        const price: Ref<number> = ref(3000);
        const duration: Ref<number> = ref(50);
        const description: Ref<string> = ref('');

        async function registerSubject() {
            await SubjectService.createSubject(subjectName.value, loginStore.getUserGUID, price.value, duration.value, description.value);

            await subjectsStore.setSubjects();
            await router.push('/subjects');
        }

        return {
            subjectName,
            price,
            duration,
            description,
            registerSubject
        }
    }
})
</script>

<template>
    <section>
        <base-card card-title="Register Subject">
            <form action="" @submit.prevent="registerSubject">
                <div class="d-flex justify-content-center m-3">
                    <div class="col-md-4">
                        <label for="subjectNameInput" class="form-label fs-5">New Subject Name</label>
                    </div>
                    <div class="col-md-6">
                        <input
                            type="text"
                            class="form-control"
                            id="subjectNameInput"
                            placeholder="Subject Name"
                            v-model="subjectName"
                        />
                    </div>
                </div>
                <div class="d-flex justify-content-center m-3">
                    <div class="col-md-4">
                        <label for="priceInput" class="form-label fs-5">Price (NTD)</label>
                    </div>
                    <div class="col-md-6">
                        <input
                            type="text"
                            class="form-control"
                            id="priceInput"
                            placeholder="3000"
                            v-model="price"
                        >
                    </div>
                </div>
                <div class="d-flex justify-content-center m-3">
                    <div class="col-md-4">
                        <label for="durationInput" class="form-label fs-5">Duration (minutes)</label>
                    </div>
                    <div class="col-md-6">
                        <input
                            type="text"
                            class="form-control"
                            id="durationInput"
                            placeholder="50"
                            v-model="duration"
                        >
                    </div>
                </div>
                <div class="d-flex m-3">
                    <div class="col-md-4 offset-md-1">
                        <label for="descriptionInput" class="form-label fs-5">Subject Description</label>
                    </div>
                </div>
                <div class="d-flex justify-content-center m-3">
                    <div class="col-md-10">
                        <textarea
                            class="form-control"
                            name=""
                            id="descriptionInput"
                            cols="20"
                            rows="6"
                            v-model="description"
                        ></textarea>
                    </div>
                </div>
                <div class="d-flex justify-content-center m-3">
                    <div class="col-md-8">
                        <div class="d-grid">
                            <button
                                @click="registerSubject"
                                type="button"
                                class="btn btn-secondary"
                            >
                                Register New Subject
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </base-card>
    </section>
</template>
