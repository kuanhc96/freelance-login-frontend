<template>
  <section>
    <BaseCard card-title="Reset Password">
      <form>
        <div class="mb-3">
          <label class="form-label" for="new-password">New Password</label>
          <input class="form-control" type="password" id="new-password" required />
        </div>
        <div class="mb-3">
          <label class="form-label" for="retype-password">Retype Password</label>
          <input class="form-control" type="password" id="retype-password" required />
        </div>
        <div class="mb-3">
          <button class="btn btn-secondary" type="submit">Reset Password</button>
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
.btn-secondary {
  background-color: #e677d3
}

/* section {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
} */

</style>