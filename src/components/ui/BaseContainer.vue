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
</style>