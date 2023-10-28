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
        <button type="submit">Save Profile</button>
      </form>
    </div>
  </template>
  
  <script>
  import {  getFirestore, doc, setDoc } from 'firebase/firestore';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  
  export default {
    name: 'ProfileSetupPageCustomer',
    data() {
      return {
        fullName: '',
        mobileNumber: '',
        deliveryAddress: '',
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
  
            // Create a reference to the user's document in Firestore (you may need to adjust this path)
            const userDocRef = doc(db, 'users', user.uid);
  
            // Create the user's profile data
            const userProfile = {
              fullName: this.fullName,
              mobileNumber: this.mobileNumber,
              deliveryAddress: this.deliveryAddress,
            };
  
            // Set the user's profile data in Firestore
            setDoc(userDocRef, userProfile)
              .then(() => {
                console.log('Profile data saved successfully.');
              })
              .catch((error) => {
                console.error('Error saving profile data:', error);
              });
          }
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
  