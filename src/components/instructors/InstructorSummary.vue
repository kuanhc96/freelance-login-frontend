<template>
    <div class="card w-100 h-100">
        <div class="card-body">
            <div class="d-flex justify-content-center align-items-stretch w-100 hstack gap-4">
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <div class="portrait-img rounded-circle overflow-hidden border " style="width:250px; height:250px;">
                        <img class="h-100 w-100 object-fit-cover" :src="portraitPath" alt="portrait">
                    </div>
                </div>
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <div class="display-5">{{ instructorName }}</div>
                    <div class="my-3 d-flex flex-wrap flex-md-nowrap w-100 gap-2 justify-content-center">
                        <span class="badge text-bg-light fs-6"
                            v-for="subject in subjectsByInstructorGUID(instructorGUID)"
                            :key="subject.subjectName"
                        >{{subject.subjectName}}</span>
                    </div>
                    <div class="actions d-flex flex-wrap flex-md-nowrap w-100 gap-2 justify-content-center">
                        <router-link :to="detailsLink" class="btn btn-primary  flex-fill text-center">View Details</router-link>
                        <button @click="subscribeOrUnsubscribe" class="btn btn-secondary flex-fill text-center">
                            {{ subscribeOrUnsubscribeText }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Cookies from 'js-cookie';
import { defineComponent, PropType, Ref, computed } from 'vue'
import {GetSubjectResponse} from "@/dto/response/getSubjectResponse";
import { useStore } from 'vuex';
import { useRoute } from 'vue-router'

export default defineComponent({
    props: {
        instructorGUID: {
            type: String as PropType<string>,
            required: true
        },
        instructorName: {
            type: String as PropType<string>,
            required: true
        },
        email: {
            type: String as PropType<string>,
            required: true
        },
        portraitPath: {
            type: String as PropType<string>,
            required: true
        },
        displaySubscribe: {
            type: Boolean as PropType<boolean>,
            default: true
        }
    },
    setup(props) {
        const store = useStore();
        const route = useRoute();
        const userGUID: Ref<string> = computed(function() {
            return store.getters['login/getUserGUID'];
        });
        const detailsLink: Ref<string> = computed(function() {
            return route.path + '/' + userGUID.value;
        });
        const resolvedPortrait: Ref<string> = computed(function() {
            return new URL(props.portraitPath, import.meta.url).href;
        });
        const contactLink: Ref<string> = computed(function() {
            return route.path + '/' + userGUID.value + '/contact';
        });
        const subscribeOrUnsubscribeText: Ref<string> = computed(function() {
            if (props.displaySubscribe) {
                return 'Subscribe'
            } else {
                return 'Unsubscribe'
            }
        });
        function subjectsByInstructorGUID(instructorGUID: string): GetSubjectResponse[] {
            return store.getters['subjects/getSubjectsByInstructorGUID'](instructorGUID);
        }
        function hasSubjectsByInstructorGUID(instructorGUID: string): boolean {
            return store.getters['subjects/hasSubjectsByInstructorGUID'](instructorGUID);
        }
        function resolveImage(path: string): string {
            return new URL(path, import.meta.url).href;
        }
        async function subscribeOrUnsubscribe(): Promise<void> {
            try {
                const csrfToken = Cookies.get('XSRF-TOKEN');
                const response: Response = await fetch(
                    'http://localhost:8081/subscription', {
                        method: props.displaySubscribe? 'POST' : 'DELETE',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-XSRF-TOKEN': csrfToken
                        },
                        body: JSON.stringify({
                            'studentGUID': userGUID.value,
                            'instructorGUID': props.instructorGUID
                        })
                    }
                );

                if (response.ok) {
                    const result: boolean = await response.json();
                    console.log(result);
                    // TODO: should have a pop-up that says success
                } else {
                    const result: boolean = await response.json();
                    console.log(result)
                    // TODO: should have a pop-up that says failed

                }
            } catch(err) {
                console.log('FAILED')
                // TODO: should have a pop-up that says failed
            }
        }

        return {
            userGUID,
            detailsLink,
            resolvedPortrait,
            contactLink,
            subscribeOrUnsubscribeText,
            subjectsByInstructorGUID,
            hasSubjectsByInstructorGUID,
            resolveImage,
            subscribeOrUnsubscribe
        }
    }

})
</script>
