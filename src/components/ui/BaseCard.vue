<template>
  <div class="base-card">
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}

.base-card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #C1D5A7; /* Sage Green */
  padding: 20px;
}

</style>
