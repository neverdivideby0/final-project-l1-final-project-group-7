<template>
    <div class="sign-up-page">
      <h1>Sign Up for Our App</h1>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="full-name">Full Name:</label>
          <input type="text" id="full-name" v-model="fullName" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="mobile-number">Mobile Number:</label>
          <input type="tel" id="mobile-number" v-model="mobileNumber" required>
        </div>
        <div class="form-group">
          <label for="delivery-address">Delivery Address:</label>
          <textarea id="delivery-address" v-model="deliveryAddress" required></textarea>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fullName: '',
        email: '',
        mobileNumber: '',
        deliveryAddress: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      signup() {
        // Add your sign-up logic here
        console.log('Full Name:', this.fullName);
        console.log('Email:', this.email);
        console.log('Mobile Number:', this.mobileNumber);
        console.log('Delivery Address:', this.deliveryAddress);
        console.log('Password:', this.password);
        console.log('Confirm Password:', this.confirmPassword);
        // You can use Firebase, Axios, or any other registration method for the actual sign-up process.
      },
    }
  };
  </script>
  
  <style scoped>
  .sign-up-page {
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
  