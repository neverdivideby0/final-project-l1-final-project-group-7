<template>
  <div class="profile-setup-page-customer">
    <h1>Customer Profile Setup</h1>
    <form @submit.prevent="saveProfile">
      <div class="form-group">
        <label for="fullName">Full Name:</label>
        <input type="text" id="fullName" v-model="fullName" required />
      </div>
      <div class="form-group">
        <label for="mobileNumber">Mobile Number:</label>
        <input type="text" id="mobileNumber" v-model="mobileNumber" required />
      </div>
      <div class="form-group">
        <label for="deliveryAddress">Delivery Address:</label>
        <textarea id="deliveryAddress" v-model="deliveryAddress" required></textarea>
      </div>
      <div class="form-group">
        <label for="profilePicture">Profile Picture:</label>
        <input type="file" id="profilePicture" @change="onFileChange" />
      </div>
      <button type="submit">Save Profile</button>
    </form>
  </div>
  <SignOutButton />
</template>

<script>
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import SignOutButton from '@/components/SignOutButton.vue';

export default {
  name: 'ProfileSetupPageCustomer',
  components: {
    SignOutButton,
  },
  data() {
    return {
      fullName: '',
      mobileNumber: '',
      deliveryAddress: '',
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
          const userDocRef = doc(db, 'users', user.uid);

          const userProfile = {
            fullName: this.fullName,
            mobileNumber: this.mobileNumber,
            deliveryAddress: this.deliveryAddress,
            accountCreatedDateTime: new Date(),
            email: this.email, // Include the email in the user profile data
          };

          setDoc(userDocRef, userProfile)
            .then(() => {
              if (this.profilePictureFile) {
                this.uploadProfilePicture(user.uid);
              } else {
                alert('Profile data saved successfully.');
                this.$router.push({ name: 'CustomerHomePage' });
              }
            })
            .catch((error) => {
              console.error('Error saving profile data:', error);
            });
        }
      });
    },
    onFileChange(e) {
      this.profilePictureFile = e.target.files[0]; // Store the selected file
    },
    uploadProfilePicture(userId) {
      // Get the Firebase Storage instance
      const storage = getStorage();

      // Create a reference to the user's profile picture in Firebase Storage
      const profilePictureRef = ref(storage, `profile_pictures/${userId}`);

      // Upload the file to Firebase Storage
      uploadBytes(profilePictureRef, this.profilePictureFile)
        .then(() => {
          // Profile data and profile picture saved successfully
          alert('Profile data and profile picture saved successfully.');
          this.$router.push({ name: 'CustomerHomePage' });
        })
        .catch((error) => {
          console.error('Error uploading profile picture:', error);
        });
    },
  },
};
</script>

<style scoped>
.profile-setup-page-customer {
  text-align: center;
  margin: 20px;
}
.form-group {
  margin-bottom: 10px;
}
</style>
