<template>
    <div class="landing-page">
    <img id = "bg" src = "@/assets/GetFitt.png" alt="">

      <h1>Welcome to Our App</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Log In</button>
      </form>
      <button @click="signup">Sign Up</button>
      <button @click="resetPassword">Reset Password</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login() {
        // Add your login logic here
        console.log('Logging in with email:', this.email, 'and password:', this.password);
        // You can use Firebase, Axios, or any other authentication method for the actual login process.
      },
      signup() {
        // Add your sign-up logic here
        console.log('Redirecting to sign-up page');
        this.$router.push({ name: 'SignUpPage' });
      },
      resetPassword() {
        // Add your reset password logic here
        console.log('Redirecting to reset password page');
      }
    }
  };
  </script>
  
  <style scoped>
  .landing-page {
    text-align: center;
    margin: 20px;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  button {
    margin: 5px;
  }
  </style>
  