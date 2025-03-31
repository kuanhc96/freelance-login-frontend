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
  background-color: #b6f0a7; /* Sage Green */
}

button {
  background-color: #F4A7B9; /* Lemonade Pink */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input[type='radio'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='radio'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

</style>