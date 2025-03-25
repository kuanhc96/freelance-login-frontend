<template>
  <section>
    <BaseCard>
      <h2>Login</h2>
      <form>
        <div>
          <label for="email">User Email </label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label for="password">Password </label>
          <input type="password" id="password" required />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <div>
        <router-link to="/createAccount">Create an account</router-link>
      </div>
      <div>
        <router-link to="/forgetPassword">Forgot password?</router-link>
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
  background-color: #C1D5A7; /* Sage Green */
}

button {
  background-color: #F4A7B9; /* Lemonade Pink */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
</style>