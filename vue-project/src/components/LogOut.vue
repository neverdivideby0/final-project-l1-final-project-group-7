<template>
  <div class="container">
    <button id="btn" @click="signOut" v-if="user">Logout</button>
    <span v-else>Please log in</span>
    <button @click="routeToLandingPage">Go to Landing Page</button>
  </div>
</template>


<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  name: "LogOut",

  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },

  methods: {
    signOut() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        // Check if the user is authenticated before signing out
        signOut(auth, user);
        console.log("User signed out");
      } else {
        console.log("User is not authenticated. No need to sign out.");
      }
      this.$router.push({ name: "LandingPage" });
    },
    routeToLandingPage() {
      // Use Vue Router to navigate to the landing page
      this.$router.push({ name: 'LandingPage' }); // Replace 'LandingPage' with your actual route name
    },
  },
};
</script>


<style scoped>
#btn {
  text-align: center;
  margin: auto;
}
#btn:hover {
  color: rgb(243, 236, 236);
  background-color: rgb(255, 94, 0);
  box-shadow: 3px 3px grey;
}

button {
  padding: 10px 20px;
  margin: 5px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>