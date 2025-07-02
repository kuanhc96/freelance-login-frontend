<template>
    <section>
        <base-card 
            card-title="Search For Instructors"
            @refresh="refresh"
        >
            <div class="d-flex align-items-center flex-column">
                <div class="col-md-10 col-10">
                    <div class="input-group mt-3">
                        <label for="search-instructors" class="border rounded-start input-group-text">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </label>
                        <input 
                            id="search-instructors" 
                            type="text" 
                            placeholder="Search Instructors" 
                            class="form-control fs-6 rounded-end col-md-10"
                            v-model="keyword"
                        >
                    </div>
                    <ul class="d-flex align-items-center list-group my-3 p-1" v-if="isKeywordBlank">
                        <instructor-summary
                            class="mb-3"
                            v-for="instructor in getUnsubscribedInstructors"
                            :key="instructor.userGUID"
                            :instructorGUID="instructor.userGUID"
                            :instructorName="instructor.name"
                            :email="instructor.email"
                            :portraitPath="'/alice.jpg'"
                            :display-subscribe="true"
                        ></instructor-summary>
                    
                    </ul> 
                    <ul class="d-flex align-items-center list-group my-3 p-1" v-else>
                        <instructor-summary
                            class="mb-3"
                            v-for="instructor in filteredInstructors"
                            :key="instructor.userGUID"
                            :instructorGUID="instructor.userGUID"
                            :instructorName="instructor.name"
                            :email="instructor.email"
                            :portraitPath="'/alice.jpg'"
                            
                        ></instructor-summary>
                    </ul> 
                </div>
            </div>
        </base-card>
    </section>
</template>

<script lang="ts">
import InstructorSummary from '../../components/instructors/InstructorSummary.vue'
import BaseCard from '../../components/ui/BaseCard.vue'
import { mapGetters } from 'vuex'
import { defineComponent } from 'vue'
import store from '@/store'
import { GetUserResponse } from '@/dto/response/getUserResponse'
export default defineComponent({
    components: {
        InstructorSummary,
        BaseCard
    },
    data(): {
        keyword: string
    } {
        return {
            keyword: ''
        }
    },
    computed: {
        ...mapGetters('instructors', ['getUnsubscribedInstructors', 'hasUnsubscribedInstructors']),
        ...mapGetters('login', ['getUserGUID']),
        isKeywordBlank(): boolean {
            return this.keyword === '';
        },
        getUnsubscribedInstructorsEndpoint(): string {
            return 'http://localhost:8081/subscription/unsubscribed/' + this.getUserGUID;
        },
        filteredInstructors(): GetUserResponse[] {
            return this.getUnsubscribedInstructors
                .filter((instructor: { instructorName: string }) => instructor.instructorName.toLowerCase().includes(this.keyword.toLowerCase()));
        },
    },
    methods: {
        async refresh(): Promise<void> {
            const response: Response = await fetch(this.getUnsubscribedInstructorsEndpoint, {
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                const data: GetUserResponse[] = await response.json();
                store.dispatch('instructors/setUnsubscribedInstructors', data)
            }
        }
    },
    async created() {
        const response: Response = await fetch(this.getUnsubscribedInstructorsEndpoint, {
            method: 'GET',
            credentials: 'include'
        })

        if (response.ok) {
            const data: GetUserResponse[] = await response.json();
            store.dispatch('instructors/setUnsubscribedInstructors', data)
        }
    },
    
})
</script>