<template>
  <div class="landing-page">
    <img id="bg" src="@/assets/GetFitt.png" alt="">

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
      <button type="submit" @click="customerLogin">Customer Login</button>
      <button type="submit" @click="businessLogin">Business Login</button>
    </form>
    <p v-if="errMsg"> {{ errMsg }}</p>
    <button @click="signup">Sign Up</button>
    <button @click="resetPassword">Reset Password</button>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      errMsg: '',
      userType: '', // Add a userType variable to distinguish between 'customer' and 'business'
    };
  },
  methods: {
    login() {
      if (this.userType === 'customer') {
        console.log('Customer logging in...');
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            console.log('Customer authenticated.'); // Add this line
            this.$router.push({ name: 'CustomerHomePage' });
          })
          .catch((error) => {
            // Handle login errors
            this.handleError(error);
          });
      } else if (this.userType === 'business') {
        console.log('Business logging in...');
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            console.log('Business authenticated.'); // Add this line
            this.$router.push({ name: 'BusinessHomePage' });
          })
          .catch((error) => {
            // Handle login errors
            this.handleError(error);
          });
      } else {
        this.errMsg = 'Please select user type';
      }
    },
    customerLogin() {
      this.userType = 'customer';
      this.login();
    },
    businessLogin() {
      this.userType = 'business';
      this.login();
    },
    signup() {
      console.log('Redirecting to sign-up page');
      this.$router.push({ name: 'SignUpPage' });
    },
    resetPassword() {
      // Handle password reset
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          alert('Password reset email sent to', this.email);
          console.log('Password reset email sent to', this.email);
          // You can also redirect to a confirmation page or display a success message
        })
        .catch((error) => {
          alert('Error sending password reset email:', error);
          console.error('Error sending password reset email:', error);
        });
    },
    handleError(error) {
      console.error('Error signing in user:', error.code);
      switch (error.code) {
        case 'auth/invalid-email':
          this.errMsg = 'Invalid email';
          break;
        case 'auth/user-not-found':
          this.errMsg = 'No account with that email was found';
          break;
        case 'auth/wrong-password':
          this.errMsg = 'Incorrect password';
          break;
        default:
          this.errMsg = 'Email or password was incorrect';
          break;
      }
    },
  },
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
