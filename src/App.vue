<template>
  <div class="" id="app">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TheHeader from './components/layout/TheHeader.vue'
import { useLoginStore } from "@/store/login";

@Options({
  components: {
    TheHeader
  },
})
export default class App extends Vue {
    created() {
        const loginStore = useLoginStore();
        loginStore.checkLogin();
    }
}
</script>

