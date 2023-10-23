<template>
  <header class="header">
    <!-- Your header content, e.g., logo, app title, user information -->
    <div class="header-content">
      <h1>Your App Name</h1>
      <p>Welcome, {{ user.displayName }}</p>
    </div>

    <!-- Sign Out Button -->
    <button class="sign-out-button" @click="signOut">Sign Out</button>
  </header>
</template>

<script>
export default {
  props: ['user'], // Pass the user information as a prop
  methods: {
    signOut() {
      // Implement your sign-out logic using Firebase
      // Example using Firebase Authentication:
      this.$firebase.auth().signOut()
        .then(() => {
          // User is signed out
          // You can optionally redirect to a sign-in page or perform other actions here
        })
        .catch(error => {
          console.error('Sign out error', error);
        });
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #FFA500; /* Dark orange background color */
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  flex: 1;
}

.sign-out-button {
  background-color: white;
  color: #FFA500; /* Dark orange text color */
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sign-out-button:hover {
  background-color: #FFD700; /* Lighter orange on hover */
}
</style>
