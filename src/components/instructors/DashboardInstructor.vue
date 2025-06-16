<template>
    <div class="card bg-light m-3">
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-around">
                <div class="portrait-img rounded-circle overflow-hidden border" style="width:100px; height:100px">
                    <img :src="portraitPath" alt="portrait" class="h-100 w-100 object-fit-cover">
                </div>
                <div class="">
                    <div class="fs-3">
                        {{ instructorName }}
                    </div>
                    <div class="badge btn btn-secondary stretched-link">See Details >></div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        instructorGUID: {
            type: String,
            required: true
        },
        instructorName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        portraitPath: {
            type: String,
            required: true
        },
    } 
}
</script>