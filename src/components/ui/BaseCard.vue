<template>
  <div class="d-flex justify-content-center m-5">
    <div class="card base-card bg-light col-md-10">
      <div class="card-body">
        <h2 class="card-title">{{cardTitle}}</h2>
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


<style lang="scss" scoped>
</style>
