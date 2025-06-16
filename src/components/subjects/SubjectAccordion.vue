<template>
    <div class="accordion w-100 h-100" id="instructorSubjectsAccordion">
        <div class="accordion-item m-3">
            <h2 class="accordion-header">
                <button 
                    class="accordion-button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#' + instructorGUID"
                >
                    <div class="w-100 me-2 d-flex justify-content-between align-items-center">
                        <span class="fs-5">{{ 'Courses By ' + instructorName }}</span>
                    </div>
                </button>
            </h2>
            <div class="accordion-collapse collapse" :id="instructorGUID" data-bs-parent="#myAccordion">
                <div class="accordion-body">
                    <ul class="d-flex align-items-center list-group my-3 p-1">
                        <subject-summary 
                            v-for="subject in subjects"
                            :key="subject.subjectName"
                            :subjectName="subject.subjectName"
                            :price="subject.price"
                            :subjectGUID="subject.subjectGUID"
                            :subjectDescription="subject.subjectDescription"
                        ></subject-summary>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SubjectSummary from './SubjectSummary.vue'
export default {
    components: {
        SubjectSummary
    },
    props: {
        instructorGUID: {
            type: String,
            required: true
        },
        instructorName: {
            type: String,
            required: true
        },
        subjects: {
            type: Array,
            required: true
        },
    } 
}
</script>