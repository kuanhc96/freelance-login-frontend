<template>
  <section>
    <BaseCard>
      <form>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" required />
        </div>
        <div>
          <label for="retype-password">Retype Password</label>
          <input type="password" id="retype-password" required />
        </div>
        <div>
          <label for="birthday">Birthday (optional)</label>
          <select id="year">
            <option>Year</option>
          </select>
          <select id="month">
            <option>Month</option>
          </select>
          <select id="day">
            <option>Day</option>
          </select>
        </div>
        <div>
          <button type="submit">Create Account</button>
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