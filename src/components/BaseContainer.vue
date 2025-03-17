<template>
  <div>
    <h2>{{title}}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title'],
};
</script>

<style scoped>
div {
  max-width: 7rem;
  max-height: 7rem;
  margin: 2rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  background-color: #F4A7B9; /* Lemonade Pink */
}

h2 {
  text-align: center;
}
</style>