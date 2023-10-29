<template>
  <div class="profile-setup-page-business">
    <h1>Business Profile Setup</h1>
    <form @submit.prevent="saveProfile">
      <div class="form-group">
        <label for="businessName">Business Name:</label>
        <input type="text" id="businessName" v-model="businessName" required />
      </div>
      <div class="form-group">
        <label for="businessNumber">Business Number:</label>
        <input type="text" id="businessNumber" v-model="businessNumber" required />
      </div>
      <div class="form-group">
        <label for="businessAddress">Business Address:</label>
        <textarea id="businessAddress" v-model="businessAddress" required></textarea>
      </div>
      <div class="form-group">
        <label for="acraIdNumber">ACRA ID Number:</label>
        <input type="text" id="acraIdNumber" v-model="acraIdNumber" required />
      </div>
      <!-- Add an input field for profile picture upload -->
      <div class="form-group">
        <label for="profilePicture">Profile Picture:</label>
        <input type="file" id="profilePicture" @change="handleProfilePictureUpload" />
      </div>
      <button type="submit">Save Profile</button>
    </form>
  </div>
</template>

<script>
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

export default {
  name: 'ProfileSetupPageBusiness',
  data() {
    return {
      businessName: '',
      businessNumber: '',
      businessAddress: '',
      acraIdNumber: '',
      email: '', // Add a data property for the email
      profilePictureFile: null,
    };
  },
  created() {
    // Fetch and display the user's email
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.email = user.email;
      }
    });
  },
  methods: {
    saveProfile() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const db = getFirestore();
          const businessDocRef = doc(db, 'businesses', user.uid);

          const businessProfile = {
            businessName: this.businessName,
            businessNumber: this.businessNumber,
            businessAddress: this.businessAddress,
            acraIdNumber: this.acraIdNumber,
            accountCreatedDateTime: new Date(),
            email: this.email, // Include the email in the profile data
          };

          setDoc(businessDocRef, businessProfile)
            .then(() => {
              alert('Business profile data saved successfully.');
              this.$router.push({ name: 'BusinessHomePage' });
            })
            .catch((error) => {
              console.error('Error saving business profile data:', error);
            });
        }
      });
    },
    // ... Your existing methods ...
  },
};
</script>

<style scoped>
.profile-setup-page-business {
  text-align: center;
  margin: 20px;
}
.form-group {
  margin-bottom: 10px;
}
</style>
