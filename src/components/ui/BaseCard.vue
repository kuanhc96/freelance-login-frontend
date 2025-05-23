<template>
  <!-- <div class="container"> -->
    <div class="d-flex justify-content-center">
      <div class="card base-card bg-light col-md-10 mt-7 rounded-4">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h2 class="card-title">{{cardTitle}}</h2>
            <div class="refresh">
                <button class="btn btn-primary" @click="refresh">Refresh</button>
            </div>
          </div>
          <slot></slot>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: [
    'cardTitle',
  ],
  methods: {
    refresh() {
      this.$emit('refresh');
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
