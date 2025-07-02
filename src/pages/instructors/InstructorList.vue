<template>
    <section>
        <base-card 
            card-title="Subscribed Instructors"
            @refresh="refresh"
        >
            <div class="d-flex align-items-center flex-column">
                <div class="col-md-10 col-10">
                    <the-search-bar
                        :id="'search-instructors'" 
                        :placeholder="'Search Instructors'" 
                        v-model="keyword"
                    ></the-search-bar>
                    <ul class="d-flex align-items-center list-group my-3 p-1" v-if="isKeywordBlank">
                        <instructor-summary
                            class="mb-3"
                            v-for="instructor in getSubscribedInstructors"
                            :key="instructor.userGUID"
                            :instructorGUID="instructor.userGUID"
                            :instructorName="instructor.name"
                            :email="instructor.email"
                            :portraitPath="'/alice.jpg'"
                            :display-subscribe="false"
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
import TheSearchBar from '../../components/layout/TheSearchBar.vue'
import { defineComponent } from 'vue'
import store from '@/store'
import { mapGetters } from 'vuex'
import { GetUserResponse } from '@/dto/response/getUserResponse'
export default defineComponent({
    name: 'InstructorList',
    data(): {
        keyword: string
    } {
        return {
            keyword: ''
        }
    },
    components: {
        InstructorSummary,
        BaseCard,
        TheSearchBar
    },
    computed: {
        isKeywordBlank(): boolean {
            return this.keyword === '';
        },
        ...mapGetters('instructors', ['getSubscribedInstructors', 'hasSubscribedInstructors']),
        ...mapGetters('login', ['getUserGUID']),
        filteredInstructors(): GetUserResponse[] {
            return this.getSubscribedInstructors.filter((instructor: { name: string }) => instructor.name.toLowerCase().includes(this.keyword.toLowerCase()));
        },
        getSubscribedInstructorsEndpoint(): string {
            return 'http://localhost:8081/subscription/' + this.getUserGUID;
        }
    },
    async created(): Promise<void> {
        const response: Response = await fetch(this.getSubscribedInstructorsEndpoint, {
            method: 'GET',
            credentials: 'include'
        })

        if (response.ok) {
            const data: GetUserResponse[] = await response.json();
            store.dispatch('instructors/setSubscribedInstructors', data)
        }

    },
    methods: {
        async refresh(): Promise<void> {
            const response: Response = await fetch(this.getSubscribedInstructorsEndpoint, {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data: GetUserResponse[] = await response.json();
                store.dispatch('instructors/setSubscribedInstructors', data)
            }
        }
    }
})
</script>