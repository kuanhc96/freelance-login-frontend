<template>
  <div class="base-card">
    <img src="@/assets/logo.png" alt="Logo" class="logo" />
    <slot></slot>
  </div>
</template>

<style scoped>
.base-card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #C1D5A7; /* Sage Green */
  padding: 20px;
}

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 10px;
}

button {
  background-color: #F4A7B9; /* Lemonade Pink */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}