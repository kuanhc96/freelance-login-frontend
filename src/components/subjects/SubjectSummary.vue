<template>
    <div class="card w-100 h-100 bg-light">
        <div class="card-body">
            <div class="card-title d-flex justify-content-around">
                <h2>
                    {{ subjectName }}
                </h2>
                <h2>
                    {{ '$' + price + '/hr'}}
                </h2>
            </div>
            <div class="d-flex justify-content-center">
                <!-- modal button -->
                <button
                    class="btn btn-secondary"
                    data-bs-toggle="modal"
                    :data-bs-target="'#modal' + subjectGUID"
                >
                    Course Description
                </button>
                <!-- modal -->
                <div class="modal fade" :id="'modal' + subjectGUID">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header ">
                                <div class="w-100 d-flex justify-content-between">
                                    <h1 class="modal-title fs-5">
                                        {{ subjectName }}
                                    </h1>
                                    <h1 class="modal-title fs-5">
                                        {{ '$' + price + '/hr' }}
                                    </h1>

                                </div>
                                <button class="btn btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                {{ subjectDescription }}
                            </div>
                            <div class="modal-footer d-flex justify-content-end">
                                <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        subjectName: {
            type: String as PropType<string>,
            required: true
        },
        price: {
            type: Number as PropType<number>,
            required: false,
            default: 0
        },
        subjectGUID: {
            type: String as PropType<string>,
            required: true
        },
        subjectDescription: {
            type: String as PropType<string>,
            required: false,
            default: 'lorem ipson'
        }
    }
})
</script>
