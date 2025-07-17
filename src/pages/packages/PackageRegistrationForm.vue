<script setup lang="ts">

</script>

<template>
<section>
    <base-card card-title="Register Package">
        <form action="" @submit.prevent="registerSubject">
            <div class="d-flex justify-content-center m-3">
                <div class="col-md-4">
                    <label for="numberOfLessonsInput" class="form-label fs-5">Number Of Lessons</label>
                </div>
                <div class="col-md-6">
                    <input
                        type="number"
                        class="form-control"
                        id="numberOfLessonsInput"
                        placeholder="Subject Name"
                        value="1"
                        min="1"
                        step="1"
                    />
                </div>
            </div>
            <div class="d-flex justify-content-center m-3">
                <div class="col-md-4">
                    <label for="discountCodeInput" class="form-label fs-5">New Discount Code</label>
                </div>
                <div class="col-md-6">
                    <input
                        type="text"
                        class="form-control"
                        id="discountCodeInput"
                        placeholder="NONE"
                    />
                </div>
            </div>

        </form>
    </base-card>
</section>
</template>

<style scoped>

</style>
