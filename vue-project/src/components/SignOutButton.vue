
<template>
  <div class="signout-button">
    <button id = "btn" @click="signOut" v-if="user">Sign Out</button>
    <span v-else>Please log in</span>
  </div>
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
    },
  };
</script>
  
<style scoped>

.signout-button {
  text-align: center;
}

#btn {
  text-align: center;
  margin: auto;
}
#btn:hover {
  color: rgb(243, 236, 236);
  background-color: rgb(255, 94, 0);
  box-shadow: 3px 3px grey;
}

/* Style for the button (you can customize) */
button {
  background-color: #FF5733;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
  </style>
