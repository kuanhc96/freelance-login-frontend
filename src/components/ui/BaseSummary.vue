<template>
    <div class="base-summary card h-100">
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