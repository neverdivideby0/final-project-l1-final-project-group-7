<template>
    <div class="email-confirmation-page">
      <h1>Email Confirmation</h1>
      <p v-if="isEmailVerified">
        Your email address has been successfully verified. Your account is now activated.
      </p>
      <p v-else>
        Your email address has not been verified. Please check your inbox and click the verification link.
      </p>
      <router-link
        v-if="isEmailVerified"
        :to="{ name: 'ProfileSetupPageCustomer' }"
      >
        Continue to Customer Profile Setup
      </router-link>
      <router-link
        v-if="isEmailVerified"
        :to="{ name: 'ProfileSetupPageBusiness' }"
      >
        Continue to Business Profile Setup
      </router-link>
    </div>
  </template>
  
  <script>
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  
  export default {
    name: 'EmailConfirmationPage',
    data() {
      return {
        isEmailVerified: false,
      };
    },
    created() {
      // Check if the user is signed in and their email is verified
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user && user.emailVerified) {
          this.isEmailVerified = true;
        }
      });
    },
  };
  </script>
  
  <style scoped>
  .email-confirmation-page {
    text-align: center;
    margin: 20px;
  }
  </style>
  