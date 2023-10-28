<template>
  <nav>
    <!-- Brand logo on the left -->
    <div class="brand-logo">
      <img src="@/assets/Fitness_First_Logo.svg.png" alt="FitnessFirst">
    </div>

    <!-- Navigation links on the right -->
    <ul class="nav-links">
      <li><router-link to="/HomePage">Home</router-link></li>
      <li><router-link to="/AboutPage">About</router-link></li>
      <li><router-link to="/ContactPage">Contact</router-link></li>
      <!-- Add more navigation links as needed -->
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped>
/* Add your CSS styles for the navbar here */
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #F08A5D;
  color: #fff;
  display: flex;
  justify-content: space-between; /* Arranges the logo on the left and links on the right */
  align-items: center;
  padding: 10px;
}

.brand-logo img {
  max-height: 40px; /* Adjust the logo's height as needed */
}

.nav-links {
  list-style: none;
  display: flex;
}

.nav-links li {
  margin-right: 10px; /* Add spacing between the links */
}

.nav-links a {
  color: #000;
  text-decoration: none; /* Remove underlines from links */
}

/* Add any other styles you need */
</style>