<template>
  <section>
    <BaseCard card-title="Login">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label" for="email">User Email </label>
          <input class="form-control" type="email" id="email" v-model="email" required />
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">Password </label>
          <input class="form-control" type="password" id="password" v-model="password" required />
        </div>
        <div class="d-grid vstack mb-3">
          <button class="btn btn-secondary" type="submit">Login</button>
        </div>
      </form>
      <div>
        <router-link class="btn btn-primary mb-3" to="/createAccount">Create an account</router-link>
      </div>
      <div>
        <router-link class="btn btn-primary" to="/forgetPassword">Forgot password?</router-link>
      </div>
    </BaseCard>
  </section>
</template>

<script>
import BaseCard from '../ui/BaseCard.vue';
export default {
  components: {
    BaseCard
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    submitForm() {
      const basicAuth = btoa(this.email + ':' + this.password);
      fetch("http://localhost:8081/testLogin", {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + basicAuth
        },
      })
      .then(response => {
        if (response.ok) {
          this.$store.dispatch('login') // TODO: call dispatch to save login info in store
          this.$router.push('/')
        } else {
          console.log(response);
        }
      })

    }
  }
}
</script>


<style lang="scss" scoped>
</style>