<template>
  <!-- Everything here is the top nav bar -->
  <div class="Banner"></div>
  <div class="buttonDiv">
    <SignOutButton />
  </div>
  <div class="Dashboard">
    <img  class="dashboard-image" src="../../../assets/GetFittSmall.png" alt="GetFitt Logo"/>
  </div>

  <!-- Everything below is the add gym listing -->
  <div class="Background">
    <div class="Rectangle">
      <h1>Add A Gym</h1>


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
  </div>


<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet">
</template>
  
  <script>
import NotFound from "@/views/NotFound.vue";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import SignOutButton from "@/components/SignOutButton.vue";

export default {
  name: "GymForm",
  components: {
    NotFound,
    SignOutButton,
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
    async fetchUpdatedGyms() {
  // Fetch updated gym data from Firebase Firestore and update the `gyms` data property
  // This assumes that you have a method to fetch gyms similar to what you have in your existing code
  await this.fetchGyms(); // You can replace this with your actual fetch method
}

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
.Rectangle {
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

/* Button CSS */
button {
  font-family: "Roboto", sans-serif;
  /* You can specify alternative font families after Roboto */
}
</style>
  