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
      <p v-if="errMsg"> {{ errMsg }}</p>
      <button @click="signup">Sign Up</button>
      <button @click="resetPassword">Reset Password</button>
    </div>
  </template>
  
  <script>
  import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // Import auth and createUserWithEmailAndPassword from Firebase
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errMsg: '', // Initialize errMsg as an empty string
      };
    },
    methods: {
      login() {
        console.log('Logging in with email:', this.email, 'and password:', this.password);
        const auth = getAuth(); // Initialize the auth module
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // User login was successful
            const user = userCredential.user;
            console.log("User Successfully signed in:", user);
            this.$router.push({ name: 'HomePage' });
          })
          .catch((error) => {
            // Handle login errors
            console.error("Error signing in user:", error.code);
            switch (error.code) {
              case "auth/invalid-email":
                this.errMsg = "Invalid email";
                break;
              case "auth/user-not-found":
                this.errMsg = "No account with that email was found";
                break;
              case "auth/wrong-password":
                this.errMsg = "Incorrect password";
                break;
              default:
                this.errMsg = "Email or password was incorrect";
                break;
            }
          });
      },
      signup() {
        console.log('Redirecting to sign-up page');
        this.$router.push({ name: 'SignUpPage' });
      },
      resetPassword() {
      const auth = getAuth(); // Initialize the auth module

      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          // Password reset email sent successfully
          alert('Password reset email sent to', this.email)
          console.log('Password reset email sent to', this.email);
          // You can also redirect to a confirmation page or display a success message
        })
        .catch((error) => {
            alert('Error sending password reset email:', error)
          console.error('Error sending password reset email:', error);
          // Display an error message to the user
        });
    }
  }
}
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
  