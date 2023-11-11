
<template>
  <div class="signout-button">
    <button id="btn" @click="signOut" v-if="user">Sign Out</button>
    <span v-else>Please log in</span>
  </div>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
    rel="stylesheet"
  />
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  name: "SignOutButton",

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
    async signOut() {
      const auth = getAuth();
      try {
        await signOut(auth);
        console.log("User signed out successfully");
        this.$router.push({ name: "LandingPage" });
      } catch (error) {
        console.error("Error signing out: ", error);
      }
    },
  },
};
</script>
  
<style scoped>
/* Style for the button (you can customize) */
button {
  background-color: #000; /* Black background color */
  color: #fff; /* White text color */
  border: 1px solid #fff; /* Add a white border around the button */
  padding: 5px 10px; /* Adjust the padding as needed */
  cursor: pointer;
  font-size: 14px; /* You can adjust the font size as needed */
  font-family: "Roboto", sans-serif; /* Specify the Roboto font and fall back to a generic sans-serif font if needed */
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s; /* Smooth transitions on hover */
  width: 100px;
}

button:hover {
  background-color: #0056b3; /* Background color change on hover */
  color: #fff; /* Text color remains white on hover */
  border-color: #0056b3; /* Border color change on hover */
}
</style>
