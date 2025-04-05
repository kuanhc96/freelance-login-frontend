<template>
<header>
    <nav class="navbar navbar-expand-lg bg-success fixed-top mb-5">
      <div class="container">
        <router-link to="/" class="navbar-brand w-auto">
          <img src="@/assets/logo.png" alt="Logo" class="logo">
            <span>
              Freelancer App
            </span>
        </router-link> 
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
            <li class="navbar-item">
                <router-link to="/instructors" class="nav-link active">Instructors</router-link> 
            </li>
            <li class="navbar-item">
                <router-link to="/courses" class="nav-link active">Courses</router-link> 
            </li>
            <li class="navbar-item">
                <router-link to="/transactions" class="nav-link active">Transaction History</router-link> 
            </li>
            <li class="navbar-item">
                <router-link to="/instructors/search" class="nav-link active">Search Instructors</router-link> 
            </li>
        </ul>

      </div>
    </nav>
</header>
</template>

<style scoped>
.logo {
  width: auto;
  height: 5rem;
  padding: 10px;
}

.bg-success {
  background-color:#b6f0a7 !important;
}

header a {
  text-decoration: none;
  color: #e677d3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #e677d3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>