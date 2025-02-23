<template>
<section>
  <BaseCard>
    <h2>Forgot Password</h2>
    <form>
      <div>
        <label for="email">Enter your email</label>
        <input type="email" id="email" required />
      </div>
      <div>
        <button type="submit">Send Reset Link</button>
      </div>
    </form>
      <div>
        <router-link to="/login">Login</router-link>
      </div>
  </BaseCard>
  </section>
</template>

<style scoped>

section {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}

</style>