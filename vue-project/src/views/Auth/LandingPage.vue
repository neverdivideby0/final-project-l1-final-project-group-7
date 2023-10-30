<template>
  <div :class="$style.landingPage">
    <div :class="$style.contentContainer">
      <div :class="$style.form">
        <div :class="$style.username">
          <div :class="$style.rectangle" />
          <div :class="$style.username1">Email:</div>
          <img :class="$style.userIcon" alt="" src="/user.svg" />
          <input type="email" id = "email" v-model="email" required />
        </div>
        <div :class="$style.password">
          <div :class="$style.rectangle" />
          <div :class="$style.password1">Password:</div>
          <img :class="$style.lockIcon" alt="" src="/lock.svg" />
          <img
            :class="$style.passwordHideAndSee"
            alt=""
            src="/password-hide-and-see.svg"
          />
          <input type="password" id = "password" v-model="password" required /> 
        </div>
        <button :class="$style.loginButton" @click="login">Login</button>
        <button :class="$style.signInButton" @click="signup">Sign Up</button>
        <div :class="$style.resetPassword" @click="resetPassword">Reset Password</div>
        <p v-if="errMsg"> {{ errMsg }}</p>
      </div>
    </div>
    <img :class="$style.getfitt1Icon" alt="" src="@/assets/GetFitt.png" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default defineComponent({
  name: "LandingPage",
  data() {
    return {
      email: '',
      password: '',
      errMsg: '',
    };
  },
  methods: {
    login() {
      console.log('Logging in...');
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          console.log('Authenticated.'); // Add this line
          // Replace the following line with appropriate routing logic
        })
        .catch((error) => {
          // Handle login errors
          this.handleError(error);
        });
    },
    signup() {
      console.log('Redirecting to sign-up page');
      // Replace the following line with appropriate routing logic
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
});
</script>


<style module>
  .contentContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .bgIcon {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 1802.5px;
    height: 1152px;
  }
  .rectangle {
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: var(--br-9xs);
    border: 1px solid var(--color-royalblue);
    box-sizing: border-box;
    width: 300px;
    height: 45px;
  }
  .username1 {
    position: absolute;
    top: 13px;
    left: 65px;
    line-height: 20px;
    text-transform: uppercase;
    font-weight: 500;
  }
  .userIcon {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 25px;
    height: 25px;
    overflow: hidden;
  }
  .username {
    position: absolute;
    top: 0px;
    left: 1px;
    width: 300px;
    height: 45px;
    font-size: var(--font-size-sm);
  }
  .password1 {
    position: absolute;
    top: 13px;
    left: 64px;
    line-height: 20px;
    text-transform: uppercase;
    font-weight: 500;
  }
  .lockIcon {
    position: absolute;
    height: 47.56%;
    width: 7.5%;
    top: 47.56%;
    right: 88.83%;
    bottom: 4.89%;
    left: 3.67%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
  }
  .passwordHideAndSee {
    position: absolute;
    top: 13px;
    left: 271px;
    width: 20px;
    height: 20px;
    overflow: hidden;
  }
  .password {
    position: absolute;
    top: 65px;
    left: 1px;
    width: 300px;
    height: 45px;
    font-size: var(--font-size-sm);
  }
  .rectangle2 {
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: var(--br-9xs);
    background-color: var(--color-white);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
    width: 300px;
    height: 45px;
  }
  .login {
    position: absolute;
    top: 14px;
    left: 124px;
    line-height: 20px;
    text-transform: uppercase;
    font-weight: 600;
  }
  .loginButton {
    position: absolute;
    top: 137px;
    left: 0px;
    width: 330px;
    height: 45px;
  }
  .signUp {
    position: absolute;
    top: 12px;
    left: 113px;
    line-height: 20px;
    text-transform: uppercase;
    font-weight: 600;
  }
  .signInButton {
    position: absolute;
    top: 208px;
    left: 2px;
    width: 330px;
    height: 45px;
  }
  .resetPassword {
    position: absolute;
    top: 279px;
    left: 89px;
    color: blue
  }
  .form {
    position: absolute;
    top: center;
    left: center;
    width: 302px;
    height: 299px;
  }
  .getfitt1Icon {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    max-height: 1000px;
    object-fit: cover;
  }
  .landingPage {
    display: flex; /* Add flexbox display */
    align-items: center; /* Vertically center the content */
    justify-content: center; /* Horizontally center the content */
    position: relative;
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
