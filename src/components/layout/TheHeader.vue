<template>
<header>
    <img src="@/assets/logo.png" alt="Logo" class="logo" />
    <nav>
        <h1>
            <router-link to="/">Freelancer App</router-link> 
        </h1>
        <ul>
            <li>
                <router-link to="/instructors">Instructors</router-link> 
            </li>
            <li>
                <router-link to="/courses">Courses</router-link> 
            </li>
            <li>
                <router-link to="/transactions">Transaction History</router-link> 
            </li>
        </ul>
    </nav>
</header>
</template>

<style scoped>
.logo {
  width: auto;
  height: 100%;
  padding: 10px;
}

header {
  width: 100%;
  height: 5rem;
  background-color: #b6f0a7; /* Sage Green */
  display: flex;
  justify-content: center;
  align-items: center;
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