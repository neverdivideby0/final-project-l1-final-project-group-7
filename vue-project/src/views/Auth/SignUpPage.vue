<template>
    <div class="sign-up-page">
      <h1>Sign Up for GetFitt</h1>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        confirmPassword: "",
        invalidFields: [],
      };
    },
  
    methods: {
      signup() {
        this.invalidFields = [];
        if (!this.email) {
          this.invalidFields.push("Email");
        }
        if (!this.password) {
          this.invalidFields.push("Password");
        }
        if (!this.confirmPassword) {
          this.invalidFields.push("Confirm Password");
        }
        if (this.password !== this.confirmPassword) {
          this.invalidFields.push("Passwords do not match");
        }
  
        if (this.invalidFields.length > 0) {
          alert(`Please fill in the following fields: ${this.invalidFields.join(", ")}`);
          return;
        }
  
        const auth = getAuth();
  
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // User registration was successful
            const user = userCredential.user;
            console.log("User registered:", user);
  
            // Send email verification
            sendEmailVerification(user)
              .then(() => {
                alert("Verification email sent to " + this.email);
                this.$router.push({ name: "EmailVerificationPage" });
              })
              .catch((error) => {
                // Handle email verification error
                console.error("Error sending verification email:", error.message);
              });
          })
          .catch((error) => {
            // Handle registration errors
            console.error("Error registering user:", error.message);
          });
      },
    },
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
  