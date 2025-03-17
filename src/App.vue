<template>
  <base-card>
    <base-container>Next Course</base-container>
    <base-container></base-container>
  </base-card>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import BaseCard from './components/BaseCard.vue';
export default {
  name: 'App',
  components: {
    BaseContainer,
    BaseCard
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>