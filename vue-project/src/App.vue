<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a70fe7;
  margin-top: 30px;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #a70fe7;
}
#nav a.router-link-exact-active {
  color: red;
}
</style>
