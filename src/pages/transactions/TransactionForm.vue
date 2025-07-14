<template>
    <section>
        <base-card card-title="Record Transaction">
            <form action="" @submit.prevent="recordTransaction">
                <div class="d-flex justify-content-center m-3">
                    <div class="col-md-4">

                    </div>
                </div>

            </form>
        </base-card>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    setup() {
        async function recordTransaction() {

        }

        return {
            recordTransaction
        }
    }

});
</script>
