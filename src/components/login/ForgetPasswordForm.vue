<template>
<section>
  <BaseCard card-title="Forgot Password">
    <form>
      <div class="mb-3">
        <label class="form-label" for="email">Enter your email</label>
        <input class="form-control" type="email" id="email" required />
      </div>
      <div>
        <button class="btn btn-secondary" type="submit">Send Reset Link</button>
      </div>
    </form>
      <div>
        <router-link to="/login">Login</router-link>
      </div>
  </BaseCard>
  </section>
</template>

<script>
import BaseCard from '../ui/BaseCard.vue';
export default {
  components: {
    BaseCard
  }
  
}
</script>

<style scoped>
</style>