<template>
    <div style="text-align:center;" v-if="user && user.emailVerified">
      <h3>This is an About Page</h3>
      <h2>Welcome to CPP</h2>
      <h3>
        Crypto Paper Portfolio (CPP) is an app to track your crypto portfolio.
        <br> It's just a demo version and is made for learning purposes. Please use accordingly.
        <br /> <br />
      </h3>
      <LogOut />
    </div>
    <div v-else>
      <p>
        Loading or user not authenticated or email not verified.
      </p>
      <LogOut />
    </div>
  </template>
  
  <script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import LogOut from '@/components/LogOut.vue'
  
  export default {
    name: "HomePage",
    components: {
      LogOut
    },
    data() {
      return {
        user: null, // Initialize user
      };
    },
    mounted() {
      console.log("About component mounted");
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is authenticated:", user);
          if (user.emailVerified) {
            this.user = user;
          } else {
            // Handle the case where the user is authenticated but their email is not verified
            console.log("User email is not verified.");
          }
        } else {
          console.log("User is not authenticated");
        }
      });
    },
  }
  </script>
  
  <style scoped>
  h1 {
    background-color: rgb(129, 184, 99);
    text-align: center;
  }
  </style>
  