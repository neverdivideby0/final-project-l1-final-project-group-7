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
   import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import auth and createUserWithEmailAndPassword from Firebase

  export default {
    data() {
      return {
        email: '',
        password: '',
        errMsg: '',
      };
    },
    methods: {
      login() {
        // Add your login logic here
        console.log('Logging in with email:', this.email, 'and password:', this.password);
        const auth = getAuth(); // Initialize the auth module
        signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // User registration was successful
          const user = userCredential.user;
          console.log("User Successfully signed in:", user);
          this.$router.push({ name: 'HomePage' });
        })
        .catch((error) => {
          // Handle registration errors
          console.error("Error signing in user:", error.message);
          switch (error.code){
            case "auth/invalid-email":
                this.errMsg.value = "Invalid email"
                break;
                case "auth/user-not-found":
                    this.errMsg.value = "No account with that email was found";
                    break;
                    case "auth/wrong-password":
                        this.errMsg.value = "Incorrect password";
                        break;
                        default:
                            this.errMsg.value = "Email or password was incorrect";
                            break;
            }
        });
    },

      signup() {
        // Add your sign-up logic here
        console.log('Redirecting to sign-up page');
        //this is to route to the next page
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
  