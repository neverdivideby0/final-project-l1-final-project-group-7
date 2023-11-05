<template>
  <div class="edit-business-profile">
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
        <img :src="existingProfilePictureUrl" alt="Existing Profile Picture" />
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
</template>
  
  <script>
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject, // Import deleteObject to delete the existing profile picture
} from "firebase/storage";

export default {
  name: "EditBusinessProfile",
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
.edit-business-profile {
  text-align: center;
  margin: 20px;
}
.form-group {
  margin-bottom: 10px;
}
</style>
  