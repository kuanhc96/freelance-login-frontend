<template>
  <div id="app">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
export default {
  name: 'App',
  components: {
    TheHeader
  }
};
</script>

<style>
</style>