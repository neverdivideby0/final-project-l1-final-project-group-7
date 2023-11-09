<template>

  <!-- Everything here is the top nav bar -->
  <div class="Banner"></div>
  <div class="buttonDiv">
    <SignOutButton />
  </div>
  <div class="Dashboard">
    <img  class="dashboard-image" src="../../../assets/GetFittSmall.png" alt="GetFitt Logo"/>
  </div>

  <!-- Everything below is the add product listing -->

  <div class="Background">
    <div class="Rectangle">

      <h1>Add A Product</h1>
      <!-- Form Div -->
      <form @submit.prevent="addProduct">
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
          <label for="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            v-model="productName"
            required
          />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea
            id="description"
            v-model="description"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="categories">Categories (Comma-separated):</label>
          <input type="text" id="categories" v-model="categories" required />
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input type="number" id="price" v-model="price" required />
        </div>
        <div class="form-group">
          <label for="imageUrl1">Image URL 1:</label>
          <input type="text" id="imageUrl1" v-model="imageUrl1" />
        </div>
        <div class="form-group">
          <label for="imageUrl2">Image URL 2:</label>
          <input type="text" id="imageUrl2" v-model="imageUrl2" />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  </div>
</template>

<script>
import NotFound from "@/views/NotFound.vue";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import SignOutButton from "@/components/SignOutButton.vue";

export default {
  name: "ProductForm",
  components: {
    NotFound,
    SignOutButton,
  },
  data() {
    return {
      productName: "",
      description: "",
      categories: "", // Store categories as a comma-separated string
      price: "",
      imageUrl1: "",
      imageUrl2: "",
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
    async addProduct() {
      const storage = getStorage();
      if (!this.user) {
        console.log("User is not authenticated");
        return; // Exit the function early
      }

      const db = getFirestore();
      const productsCollection = collection(db, "products");
      const uploadedImageUrls = [];

      try {
        // Check if there are any uploaded images
        if (this.uploadedImages && this.uploadedImages.length > 0) {
          // Iterate over uploadedImageUrls and add them to the productData
          for (let i = 0; i < this.uploadedImages.length; i++) {
            const file = this.uploadedImages[i];
            const fileName = `${this.user.uid}_${Date.now()}_${file.name}`; // Create a unique filename

            // Reference to the location where you want to store the file in Firebase Storage
            const storageRef = ref(storage, "product_images/" + fileName);

            // Upload the file to Firebase Storage
            await uploadBytes(storageRef, file);
            console.log("File uploaded");

            // Get the download URL for the uploaded file
            const downloadURL = await getDownloadURL(storageRef);

            // Store the download URL in the array
            uploadedImageUrls.push(downloadURL);
          }
        }

        // Define productData
        const productData = {
          businessId: this.user.uid,
          productName: this.productName,
          description: this.description,
          category: this.categories
            .split(",")
            .map((category) => category.trim()), // Split and trim categories into an array
          price: parseFloat(this.price),
          imageUrls: [this.imageUrl1, this.imageUrl2].filter((url) => url), // Filter out empty URLs
          uploadedImageUrls: uploadedImageUrls, // Include the uploaded image URLs
          email: this.email, // Include the email in the profile data
          productCreatedDateTime: new Date(),
          productModifiedDateTime: new Date(),
        };

        // Add productData to Firestore
        await addDoc(productsCollection, productData);
        alert("Product added successfully.");

        // Clear the form fields
        this.productName = "";
        this.description = "";
        this.price = "";
        this.imageUrl1 = "";
        this.imageUrl2 = "";
        this.categories = ""; // Clear categories
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },

    async handleImageUpload() {
      const files = this.$refs.uploadImages.files;
      this.uploadedImages = files;
    },

    signOut() {
      // Add code here to sign the user out, if applicable
      // Then, navigate to the sign-out page
      this.$router.push({ name: "SignOut" }); // Replace 'SignOut' with the actual route name
    },

    goHome() {
      // Navigate to the home page
      this.$router.push({ name: "BusinessHomePage" }); // Replace 'Home' with the actual route name
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
.Rectangle {
  width: 708px;
  background: white;
  border-radius: 30px;
  margin-top: 100px;
}

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
