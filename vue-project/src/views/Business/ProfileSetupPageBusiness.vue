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
        <button type="submit">Save Profile</button>
      </form>
    </div>
  </template>
  
  <script>
  import { getFirestore, doc, setDoc } from 'firebase/firestore';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  
  export default {
    name: 'ProfileSetupPageBusiness',
    data() {
      return {
        businessName: '',
        businessNumber: '',
        businessAddress: '',
        acraIdNumber: '',
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
            };
  
            // Set the business's profile data in Firestore
            setDoc(businessDocRef, businessProfile)
              .then(() => {
                console.log('Business profile data saved successfully.');
              })
              .catch((error) => {
                console.error('Error saving business profile data:', error);
              });
          }
        });
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
  