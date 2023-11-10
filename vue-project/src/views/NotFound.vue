<template>
    <div style="text-align: center;">
      <h3>Page Not Found !!</h3>
      <h4>Please click on the above available options</h4>
      <SignOutButton />
      <GoLandingPage />
      <br />
    </div>
  </template>
  
  <script>
  import SignOutButton from "@/components/SignOutButton.vue";
  import GoLandingPage from "@/components/GoLandingPage.vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  
  export default {
    name: "NotFound",
    components: {
      SignOutButton,
      GoLandingPage,
    },
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
  }
  </script>
  