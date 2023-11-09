<template>

  <!-- Everything here is the top nav bar -->
  <div class="Banner"></div>
  <div class="buttonDiv">
    <SignOutButton />
  </div>
  <div class="Dashboard">
    <img  class="dashboard-image" src="../../assets/GetFittSmall.png" alt="GetFitt Logo"/>
  </div>

  <!-- Everything below is the edit business profile -->
  <div class="Background">
    <div class="Rectangle14">
      <h1>Edit Business Profile</h1>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
        <label for="businessName">Business Name:</label>
        <input type="text" id="businessName" v-model="businessName" required />
        </div>
      <div class="form-group">
        <label for="businessNumber">Business Number:</label>
        <input
          type="text"
          id="businessNumber"
          v-model="businessNumber"
          required
        />
      </div>
      <div class="form-group">
        <label for="businessAddress">Business Address:</label>
        <textarea
          id="businessAddress"
          v-model="businessAddress"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="acraIdNumber">ACRA ID Number:</label>
        <input type="text" id="acraIdNumber" v-model="acraIdNumber" required />
      </div>
      <div class="form-group">
        <label for="website">Website:</label>
        <input type="text" id="website" v-model="website" />
      </div>

      <!-- Display the existing profile picture -->
      <div class="form-group">
        <label for="existingProfilePicture">Existing Profile Picture:</label>
        <div class="profile-picture">
        <img :src="existingProfilePictureUrl" alt="Existing Profile Picture" />
        </div>
      </div>
      <!-- Input field to upload a new profile picture -->
      <div class="form-group">
        <label for="profilePicture">Profile Picture:</label>
        <input
          type="file"
          id="profilePicture"
          @change="handleProfilePictureUpload"
        />
      </div>
        <button type="submit">Update Profile</button>
      </form>
  </div>
</div>

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet">
</template>
  
<script>
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignOutButton from "@/components/SignOutButton.vue";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject, // Import deleteObject to delete the existing profile picture
} from "firebase/storage";

export default {
  name: "EditBusinessProfile",
  components: {
    SignOutButton,
  },
  data() {
    return {
      businessName: "",
      businessNumber: "",
      businessAddress: "",
      acraIdNumber: "",
          website: "", // Add the website field

      profilePictureFile: null, // Store the uploaded profile picture file
      existingProfilePictureUrl: "", // Store the existing profile picture URL
    };
  },
  created() {
    // Load the existing business profile data here and pre-fill the form fields
    this.loadBusinessProfile();
  },
  methods: {
    async loadBusinessProfile() {
      // Get the authenticated user
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const db = getFirestore();
          const businessDocRef = doc(db, "businesses", user.uid);

          try {
            const businessDoc = await getDoc(businessDocRef);
            if (businessDoc.exists()) {
              const businessData = businessDoc.data();
              this.businessName = businessData.businessName;
              this.businessNumber = businessData.businessNumber;
              this.businessAddress = businessData.businessAddress;
              this.acraIdNumber = businessData.acraIdNumber;
              this.website = businessData.website;
              // Retrieve the existing profile picture URL
              // You might have to adjust the path to your storage folder
              const storage = getStorage();
              const profilePictureRef = ref(
                storage,
                `profile_pictures/${user.uid}`
              );
              this.existingProfilePictureUrl = await getDownloadURL(
                profilePictureRef
              );
            }
          } catch (error) {
            console.error("Error loading business profile:", error);
          }
        }
      });
    },
    async updateProfile() {
      // Get the authenticated user
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Update the business profile data
          const db = getFirestore();
          const businessDocRef = doc(db, "businesses", user.uid);

          const businessProfile = {
            businessName: this.businessName,
            businessNumber: this.businessNumber,
            businessAddress: this.businessAddress,
            acraIdNumber: this.acraIdNumber,
            website: this.website,
          };

          // Update the document in Firestore
          try {
            await updateDoc(businessDocRef, businessProfile);
            alert("Business profile updated successfully.");
          } catch (error) {
            console.error("Error updating business profile:", error);
          }

          // Upload a new profile picture if one was selected
          if (this.profilePictureFile) {
            await this.uploadProfilePictureToStorage(user);
          }
        }
      });
    },
    handleProfilePictureUpload(event) {
      const file = event.target.files[0];
      this.profilePictureFile = file;
    },
    async uploadProfilePictureToStorage(user) {
      if (this.profilePictureFile) {
        const storage = getStorage();
        const profilePictureRef = ref(storage, `profile_pictures/${user.uid}`);

        try {
          // Delete the existing profile picture
          if (this.existingProfilePictureUrl) {
            const existingPictureRef = ref(
              storage,
              this.existingProfilePictureUrl
            );
            await deleteObject(existingPictureRef);
          }

          // Upload the new profile picture
          await uploadBytes(profilePictureRef, this.profilePictureFile);
          alert("Profile picture uploaded successfully.");
        } catch (error) {
          console.error("Error uploading profile picture:", error);
        }
      }
    },
  },
};
</script>
  
  <style scoped>

/* Top Nav Bar CSS */

/* Div Below Banner To Push The Words below banner" */ 
.MenuBar {
  width: 1440px;
  height: 90px;
  position: relative;
  background: rgba(0, 108, 228, 0.10);
}
/* This is the orange banner */ 
.Banner {
  height: 90px;
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  background: #FF5733;
}
/* Sign Out Button Div */ 
.buttonDiv {
  width: 92.14px;
  height: 44px;
  left: 90%;
  top: 23px;
  position: absolute;
  justify-content: flex-end;
  align-items: center;
  display: inline-flex;
  z-index: 1;
}
/* This is the center of the dashboard with logo and dashboard name */
.Dashboard {
  width: 100%; /* Use 100% width to span the entire container */
  height: 54px; /* Allow the height to adjust based on content */
  position: absolute;
  text-align: center;
  color: black;
  font-size: 32px;
  font-family: 'Roboto';
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
  display: flex;
  flex-direction: column; /* Stack image and text vertically */
  align-items: center; /* Center horizontally within the div */
  justify-content: center; /* Center vertically within the div */
  top: 2%; /* Adjust the vertical position as a percentage */
}
.dashboard-image {
  max-width: 100%; /* Ensure the image doesn't exceed the width of the parent div */
  max-height: 100%; /* Ensure the image doesn't exceed the height of the parent div */
  display: block; /* Remove any extra space reserved for inline elements */
  margin: 0 auto; /* Center the image horizontally within the parent div */
}

/* BODY CSS */

/* Form and Edit Business Profile CSS */ 
.Background {
  background: rgba(0, 108, 228, 0.10);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  /* Remove height property */
}

/* Rectangle covering the form */ 
.Rectangle14 {
  width: 708px;
  background: white;
  border-radius: 30px;
  margin-top: 100px;
}

/* Form CSS */
.form-group {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 10px auto; /* Center horizontally and adjust the top and bottom margin as needed */
  max-width: 500px; /* Adjust the maximum width as needed */
}

.profile-picture img {
  max-width: 100%; /* Set a maximum width to prevent it from being too large */
  max-height: 200px; /* Adjust the maximum height as needed */
  display: block; /* Remove any extra space reserved for inline elements */
  margin: 0 auto; /* Center the image horizontally */
}

/* Button CSS */
button {
  font-family: "Roboto", sans-serif;
  /* You can specify alternative font families after Roboto */
}


</style>
  