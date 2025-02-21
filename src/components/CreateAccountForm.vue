<template>
  <BaseCard>
    <form>
      <label for="email">Email</label>
      <input type="email" id="email" required />
      <label for="name">Name</label>
      <input type="text" id="name" required />
      <label for="password">Password</label>
      <input type="password" id="password" required />
      <label for="retype-password">Retype Password</label>
      <input type="password" id="retype-password" required />
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
      <button type="submit">Create Account</button>
    </form>
  </BaseCard>
</template>