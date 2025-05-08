<template>
    <div class="base-summary m-5 card">
      <div class="card-body">
        <h3 class="card-title">{{summaryTitle}}</h3>
        <div class="card-text">
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: [
    'summaryTitle'
  ]
}
</script>

<style scoped>
</style>