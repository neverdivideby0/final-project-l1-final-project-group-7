<template>
  <div :class="$style.landingPage">
    <img :class="$style.bgIcon" src="@/assets/GetFitt.png" alt="">
    <form @submit.prevent="login" :class="$style.form">
      <div :class="$style.username">
        <input type="email" id="email" v-model="email" required placeholder="Email"/>
      </div>
      <div :class="$style.password">
        <input type="password" id="password" v-model="password" required placeholder="Password"/>
      </div>
      <div :class="$style.buttonGroup">
        <button type="submit" @click="customerLogin" :class="$style.loginButton">Customer Login</button>
        <button type="submit" @click="businessLogin" :class="$style.loginButton">Business Login</button>
        <button @click="signup" :class="$style.signUpButton">Sign Up</button>
        <button @click="resetPassword" :class="$style.resetPasswordButton">Reset Password</button>
                <p v-if="errMsg" :class="$style.errorMessage"> {{ errMsg }}</p>
      </div>
    </form>
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
      if (this.userType === 'customers') {
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
      } else if (this.userType === 'businesses') {
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
      this.userType = 'customers';
      this.login();
    },
    businessLogin() {
      this.userType = 'businesses';
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


<style module>
  .contentContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .bgIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1802.5px;
    height: 1152px;
    margin-bottom: 20px;
  }

  .password {
    position: absolute;
    top: 65px;
    left: 0px;
    width: 300px;
    height: 45px;
    font-size: var(--font-size-sm);
  }

  .login {
    position: absolute;
    top: 14px;
    left: 0px;
    line-height: 20px;
    text-transform: uppercase;
    font-weight: 600;
    width: 300px;
  }
  .buttonGroup {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 69px;
    width: 327px;
  }
  .loginButton {
    margin-bottom: 10px;
    width: 327px;
    align-items: center;
  }
  .signUp {
    position: absolute;
    top: 12px;
    left: 113px;
    line-height: 20px;
    text-transform: uppercase;
    width: 327px;
    font-weight: 600;
  }
  .signUpButton {
    margin-bottom: 10px;
    width: 327px;
  }
  .resetPasswordButton {
    margin-bottom: 10px;
  }
  .form {
    position: absolute;
    top: center;
    left: center;
    width: 300px;
    height: 299px;
  }

  .landingPage {
    display: flex; /* Add flexbox display */
    align-items: center; /* Vertically center the content */
    justify-content: center; /* Horizontally center the content */
    position: absolute;
    background-color: #ff8a00;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    text-align: center;
    font-size: var(--font-size-base);
    color: var(--color-royalblue);
    font-family: var(--font-montserrat);
  }
</style>
