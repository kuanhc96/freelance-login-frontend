<template>
    <div class="base-summary">
      <slot></slot>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
div {
  margin: 1rem auto;
  max-width: 90%;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}

.base-summary {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: azure;
  padding: 20px;
}
</style>