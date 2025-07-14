<script lang="ts">
import { defineComponent, PropType, Ref, computed } from 'vue'
import { useLoginStore } from "@/store/login";
import {useRoute} from "vue-router";
export default defineComponent({
    props: {
        studentGUID: {
            type: String as PropType<string>,
            required: true
        },
        studentName: {
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
        }
    },
    setup(props) {
        const loginStore = useLoginStore();
        const route = useRoute();
        const userGUID: Ref<string> = computed(function() {
            return loginStore.getUserGUID;
        });
        const detailsLink: Ref<string> = computed(function() {
            return route.path + '/' + props.studentGUID;
        })
        const contactLink: Ref<string> = computed(function() {
            return route.path + '/' + props.studentGUID + '/contact';
        });
        function resolveImage(path: string): string {
            return new URL(path, import.meta.url).href;
        }

        return {
            userGUID,
            detailsLink,
            contactLink,
            resolveImage
        }
    }
});

</script>

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
                    <div class="display-5">{{ studentName }}</div>
                    <div class="actions d-flex flex-wrap flex-md-nowrap w-100 gap-2 justify-content-center">
                        <router-link :to="detailsLink" class="btn btn-primary  flex-fill text-center">View Details</router-link>
                        <router-link :to="contactLink" class="btn btn-secondary  flex-fill text-center">Contact</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
