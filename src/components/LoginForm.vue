<template>
  <BaseCard>
    <form>
      <label for="email">User Email</label>
      <input type="email" id="email" required />
      <label for="password">Password</label>
      <input type="password" id="password" required />
      <button type="submit">Login</button>
    </form>
    <router-link to="/createAccount">Create an account</router-link>
    <router-link to="/forgetPassword">Forgot password?</router-link>
  </BaseCard>
</template>