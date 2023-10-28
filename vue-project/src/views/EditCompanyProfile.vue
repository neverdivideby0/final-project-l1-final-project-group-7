<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="companyWebsite">Company Website:</label>
          <input type="text" id="companyWebsite" v-model="formData.companyWebsite" />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="formData.name" />
        </div>
        <div>
          <label for="aboutUs">About Us:</label>
          <textarea id="aboutUs" v-model="formData.aboutUs"></textarea>
        </div>
        <div>
          <label for="contactNumber">Contact Number:</label>
          <input type="text" id="contactNumber" v-model="formData.contactNumber" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import auth and createUserWithEmailAndPassword from Firebase

  export default {
    data() {
      return {
        formData: {
          companyWebsite: "",
          name: "",
          aboutUs: "",
          contactNumber: ""
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          await db.collection("companies").add(this.formData);
          alert("Data successfully stored!");
        } catch (error) {
          alert("Error storing data: " + error);
        }
      }
    }
  };
  </script>
  