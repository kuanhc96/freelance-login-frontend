<template>
    <div class="base-summary card w-100 h-100">
      <div class="card-body">
        <slot></slot>
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