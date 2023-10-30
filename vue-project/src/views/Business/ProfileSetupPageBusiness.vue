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
      profilePictureFile: null, // Store the uploaded profile picture file
    };
  },
  methods: {
    saveProfile() {
      // Get the authenticated user
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Get the Firestore instance
          const db = getFirestore();

          // Create a reference to the business's document in Firestore (you may need to adjust this path)
          const businessDocRef = doc(db, 'businesses', user.uid);

          // Create the business's profile data
          const businessProfile = {
            businessName: this.businessName,
            businessNumber: this.businessNumber,
            businessAddress: this.businessAddress,
            acraIdNumber: this.acraIdNumber,
            accountCreatedDateTime: new Date(), // Add the current date and time
          };

          // Set the business's profile data in Firestore
          setDoc(businessDocRef, businessProfile)
            .then(() => {
              // Alert to notify the user
              alert('Business profile data saved successfully.');

              // Push the user to the BusinessHomePage
              this.$router.push({ name: 'BusinessHomePage' });
            })
            .catch((error) => {
              console.error('Error saving business profile data:', error);
            });
        }
      });
    },
    handleProfilePictureUpload(event) {
      // Handle the profile picture upload when a file is selected
      const file = event.target.files[0];
      this.profilePictureFile = file;
    },
    async uploadProfilePictureToStorage(user) {
      // Upload the profile picture to Firebase Storage
      const storage = getStorage();
      const profilePictureRef = ref(storage, `profile_pictures/${user.uid}`);
      
      try {
        await uploadBytes(profilePictureRef, this.profilePictureFile);
        console.log('Profile picture uploaded successfully.');
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    },
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
