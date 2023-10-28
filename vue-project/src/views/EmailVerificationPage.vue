<template>
    <div class="email-verification-page">
      <h1>Email Verification</h1>
      <p>
        A verification email has been sent to your email address.
        Please check your inbox and click the verification link to activate your account.
      </p>
      <button @click="requestNewVerificationEmail" :disabled="requestingNewEmail">
        Request New Verification Email
      </button>
      <p v-if="requestingNewEmail">A new email will be sent in {{ remainingTime }} seconds.</p>
      <router-link :to="{ name: 'EmailConfirmationPage' }">Continue to Email Confirmation</router-link>

    </div>
  </template>
  
  <script>
  import { getAuth, sendEmailVerification } from "firebase/auth";
  
  export default {
    data() {
      return {
        requestingNewEmail: false,
        remainingTime: 60,
        timer: null,
      };
    },
    methods: {
      requestNewVerificationEmail() {
        // Disable the button
        this.requestingNewEmail = true;
  
        const auth = getAuth();
        const user = auth.currentUser;
  
        if (user) {
          // Send a new email verification
          sendEmailVerification(user)
            .then(() => {
              // Success: Email sent
            })
            .catch((error) => {
              // Handle the error
              console.error("Error sending verification email:", error.message);
            })
            .finally(() => {
              // Re-enable the button
              this.requestingNewEmail = false;
            });
        }
  
        // Start the timer
        this.timer = setInterval(() => {
          this.remainingTime -= 1;
          if (this.remainingTime === 0) {
            // Clear the timer
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      },
    },
    beforeUnmount() {
      // Clear the timer when the component is unmounted
      if (this.timer !== null) {
        clearInterval(this.timer);
      }
    },
  };
  </script>
  
  <style scoped>
  .email-verification-page {
    text-align: center;
    margin: 20px;
  }
  </style>
  