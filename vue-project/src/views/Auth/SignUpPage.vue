<template>
  <div class="sign-up-page">
    <h1>Sign Up for GetFitt</h1>
    <form @submit.prevent="signup">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
        <!-- Display email error message -->
        <div class="error-message">{{ emailErrorMessage }}</div>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          v-model="confirmPassword"
          required
        />
      </div>
      <button type="submit">Sign Up</button>
      <div v-if="emailErrorMessage">
        <p>
          Suggestion: If you already have an account, you can reset your
          password.
        </p>
        <button @click="resetPassword">Reset Password</button>
      </div>
    </form>
  </div>
</template>
  
  <script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      invalidFields: [],
      emailErrorMessage: "", // Initialize email error message
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
      alert(
        `Please fill in the following fields: ${this.invalidFields.join(
          ", "
        )}`
      );
      return;
    }
    this.invalidFields = [];
    this.emailErrorMessage = ""; // Clear email error message

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email.match(emailRegex)) {
      this.emailErrorMessage = "Invalid email format";
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
        console.error("Error registering user:", error.code, error.message);

        if (error.code === "auth/email-already-in-use") {
          // User with this email already exists, display a message
          this.emailErrorMessage = "User with this email already exists";
        } else {
          // Display a generic error message
          alert("Error registering user: " + error.message);
        }
      });
  },

    resetPassword() {
      this.emailErrorMessage = ""; // Clear email error message

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email.match(emailRegex)) {
        this.emailErrorMessage = "Invalid email format";
        return;
      }

      const auth = getAuth();

      // Send a password reset email to the user with the same email
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          alert("Password reset email sent to " + this.email);
        })
        .catch((error) => {
          // Handle password reset email error
          console.error("Error sending password reset email:", error.message);
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