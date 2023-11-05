<template>
  <div class="gym-form">
    <h2>Add a Gym</h2>

    <form @submit.prevent="addGym">
      <div class="form-group">
        <label for="gymName">Gym Name:</label>
        <input type="text" id="gymName" v-model="gymName" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="address" required />
      </div>
      <div class="form-group">
        <label for="postalCode">Postal Code:</label>
        <input type="text" id="postalCode" v-model="postalCode" required />
      </div>
      <div class="form-group">
        <label for="contactNumber">Contact Number:</label>
        <input type="tel" id="contactNumber" v-model="contactNumber" required />
      </div>
      <div class="form-group">
        <label for="operationalHours">Operational Hours:</label>
        <input
          type="text"
          id="operationalHours"
          v-model="operationalHours"
        />
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="price" required />
      </div>
      <div class="form-group">
        <label for="uploadImages">Upload Images:</label>
        <input
          type="file"
          id="uploadImages"
          ref="uploadImages"
          multiple
          @change="handleImageUpload"
        />
      </div>
      <div class="form-group">
        <label for="imageUrl1">Image URL 1:</label>
        <input type="text" id="imageUrl1" v-model="imageUrl1" />
      </div>
      <div class="form-group">
        <label for="imageUrl2">Image URL 2:</label>
        <input type="text" id="imageUrl2" v-model="imageUrl2" />
      </div>
      <div class="form-group">
        <label for="amenities">Amenities:</label>
        <textarea id="amenities" v-model="amenities"></textarea>
      </div>
      <div class="form-group">
        <label for="socialMediaLinks">Social Media Links:</label>
        <input type="text" id="socialMediaLinks" v-model="socialMediaLinks" />
      </div>
      <button type="submit">Add Gym Listing</button>
    </form>
  </div>
</template>
  
  <script>
import NotFound from "@/views/NotFound.vue";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "GymForm",
  components: {
    NotFound,
  },
  data() {
    return {
      gymName: "",
      description: "",
      address: "",
      postalCode: "",
      contactNumber: "",
      operationalHours: "",
      price: "",
      imageUrl1: "",
      imageUrl2: "",
      amenities: "",
      socialMediaLinks: "",
      user: null,
      email: "",
    };
  },

  created() {
    // Fetch and display the user's email
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
      }
    });
  },
  methods: {
    async addGym() {
  const storage = getStorage();
  if (!this.user) {
    console.log("User is not authenticated");
    return; // Exit the function early
  }

  const db = getFirestore();
  const gymsCollection = collection(db, "gyms");
  const uploadedImageUrls = [];

  try {
    // Check if any files were uploaded
    if (this.uploadedImages && this.uploadedImages.length > 0) {
      // Iterate over uploadedImages and add them to the gymData
      for (let i = 0; i < this.uploadedImages.length; i++) {
        const file = this.uploadedImages[i];
        const fileName = `${this.user.uid}_${Date.now()}_${file.name}`; // Create a unique filename

        // Reference to the location where you want to store the file in Firebase Storage
        const storageRef = ref(storage, "gym_images/" + fileName);

        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, file);
        console.log("File uploaded");

        // Get the download URL for the uploaded file
        const downloadURL = await getDownloadURL(storageRef);

        // Store the download URL in the array
        uploadedImageUrls.push(downloadURL);
      }
    }

    // Define gymData
    const gymData = {
      businessId: this.user.uid,
      gymName: this.gymName,
      description: this.description,
      address: this.address,
      contactNumber: this.contactNumber,
      operationalHours: this.operationalHours,
      price: parseFloat(this.price),
      imageUrls: [this.imageUrl1, this.imageUrl2].filter((url) => url), // Filter out empty URLs
      uploadedImageUrls: uploadedImageUrls, // Include the uploaded image URLs
      email: this.email, // Include the email in the profile data
      gymCreatedDateTime: new Date(),
      gymModifiedDateTime: new Date(),

      postalCode: this.postalCode,
      amenities: this.amenities,
      socialMediaLinks: this.socialMediaLinks,
    };

    // Add gymData to Firestore
    await addDoc(gymsCollection, gymData);
    alert("Gym added successfully.");

    // Clear the form fields
    this.gymName = "";
    this.description = "";
    this.address = "";
    this.contactNumber = "";
    this.operationalHours = "";
    this.price = "";
    this.imageUrl1 = "";
    this.imageUrl2 = "";
    this.city = "";
    this.state = "";
    this.postalCode = "";
    this.amenities = "";
    this.socialMediaLinks = "";
  } catch (error) {
    console.error("Error adding gym:", error);
  }
},


    async handleImageUpload() {
      const files = this.$refs.uploadImages.files;
      this.uploadedImages = files;
    },
  },
};
</script>
  
  <style scoped>
.gym-form {
  text-align: center;
  margin: 20px;
}
.form-group {
  margin-bottom: 10px;
}
</style>
  