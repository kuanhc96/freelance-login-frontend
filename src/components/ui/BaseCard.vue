<template>
  <div class="d-flex justify-content-center m-5">
    <div class="card base-card bg-primary col-10">
      <div class="card-body">
        <h5 class="card-title">{{cardTitle}}</h5>
        <slot></slot>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: [
    'cardTitle',
  ]
}
</script>


<style scoped>
.bg-primary {
  background-color: #b6f0a7 !important;
}
/* div {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
} */

/* .base-card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #b6f0a7; // sage green
  padding: 20px;
} */

</style>
