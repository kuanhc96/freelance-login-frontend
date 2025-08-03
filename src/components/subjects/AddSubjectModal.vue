<script lang="ts">
import {defineComponent, ref, Ref} from "vue";
import {useLoginStore} from "@/store/login";
import {useSubjectsStore} from "@/store/subjects";
import {useRouter} from "vue-router";
import Cookies from "js-cookie";
import {CreateSubjectRequest} from "@/dto/request/createSubjectRequest";
import {SUBJECTS_ENDPOINT} from "@/store";

export default defineComponent({
    name: 'AddSubjectModal',
    setup() {
        const loginStore = useLoginStore();
        const subjectsStore = useSubjectsStore();
        const router = useRouter();
        const subjectName: Ref<string> = ref('');
        const price: Ref<number> = ref(3000);
        const duration: Ref<number> = ref(50);
        const description: Ref<string> = ref('');

        async function registerSubject() {
            const csrfToken = Cookies.get('XSRF-TOKEN');
            const createSubjectRequest: CreateSubjectRequest = {
                subjectName: subjectName.value,
                instructorGUID: loginStore.getUserGUID,
                price: price.value,
                duration: duration.value,
                subjectDescription: description.value
            }
            const response: Response = await fetch(SUBJECTS_ENDPOINT + 'createSubject', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken
                },
                body: JSON.stringify(createSubjectRequest)
            });

            if (response.ok) {
                await subjectsStore.setSubjects();
                await router.push('/subjects');
            }
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
    <span
        class="badge btn text-bg-primary text-dark fs-7 mx-2"
        data-bs-target="#addSubjectModal"
        data-bs-toggle="modal"
    >
        + Add
    </span>
    <div class="modal fade" id="addSubjectModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">New Subject</h1>
                    <button class="btn btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
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
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
