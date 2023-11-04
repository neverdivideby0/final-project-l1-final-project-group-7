<template>
  <div class="product-form">

    <!-- Nav bar -->
    <nav class = "navbar"> 

      <div class = "navbar-left"> 
        <img src="@/assets/GetFitt.png" alt="Logo" class="navbar-logo" />
      
      </div>

      <div class="navbar-right">

        <!-- Buttons -->
        <button id = "btn" @click="signOut" v-if="user">Sign Out</button>
        <button @click="goBackToHome">Back to Home</button>
        <SignOutButton /> 
      </div>


    <!-- Form Div -->
    <div class = "actualForm"> 

      <h2>Add Product Listing</h2>

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
          <input type="text" id="productName" v-model="productName" required />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" v-model="description" required></textarea>
        </div>
        <div class="form-group">
        <label for="categories">Categories (Comma-separated):</label>
        <input
          type="text"
          id="categories"
          v-model="categories"
          required
        />
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
  </nav>
  </div>
  

</template>




<script>
import NotFound from "@/views/NotFound.vue";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "ProductForm",
  components: {
    NotFound,
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

        // Define productData
        const productData = {
          businessId: this.user.uid,
          productName: this.productName,
          description: this.description,
          category: this.categories.split(',').map((category) => category.trim()), // Split and trim categories into an array
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
      this.$router.push({ name: 'SignOut' }); // Replace 'SignOut' with the actual route name
    },

    goHome() {
      // Navigate to the home page
      this.$router.push({ name: 'BusinessHomePage' }); // Replace 'Home' with the actual route name
    },
  },
};
</script>
  
  <style scoped>

/* navbar style */
.navbar {
  background-color: #FF5733;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px; /* Adjust the padding as needed */
  height: 60px; /* Adjust the height as needed */
}

.navbar-logo {
  max-width: 400px;
}
.navbar-left {
  display: flex;
  align-items: center;
}
.navbar-right {
  display: flex;
  gap: 10px; /* Adjust the gap between buttons */
}

/* Additional styling for the buttons */
.navbar button {
  background-color: white;
  color: #FF5733;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 10px;
  margin: 20px;
  width: 500px;
  font-family: 'Montserrat', sans-serif; /* Use the correct font name */
  font-weight: bold; /* Make the font bold */
  justify-content: center;
}
.actualForm {
  text-align: center;
  margin: 20px;
  padding: 20px;
  border: 2px solid #000;
  border-radius: 100px;
  width: 700px;
  margin: 0 auto; /* Center horizontally */
  display: flex;
  align-items: center; /* Center vertically */
}

.product-form {
  text-align: center;
}

/* make text black */
.product-form h2,
.product-form label,
.product-form input,
.product-form textarea {
  color: black;
}
.custom-category {
  margin-top: 10px;
}
</style>
