<template>
  <div class="product-form">
    <h2>Add a Product</h2>

    <form @submit.prevent="addProduct">
      <div class="form-group">
        <label for="productName">Product Name:</label>
        <input type="text" id="productName" v-model="productName" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="category">Category:</label>
        <input type="text" id="category" v-model="category" required />
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
      <button type="submit">Add Product</button>
    </form>
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
      category: "",
      price: "",
      imageUrl1: "",
      imageUrl2: "",
      user: null,
      email: '',
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
          category: this.category,
          price: parseFloat(this.price),
          imageUrls: [this.imageUrl1, this.imageUrl2].filter((url) => url), // Filter out empty URLs
          uploadedImageUrls: uploadedImageUrls, // Include the uploaded image URLs
          email: this.email, // Include the email in the profile data
          productCreatedDateTime: new Date(),
        };

        // Add productData to Firestore
        await addDoc(productsCollection, productData);
        alert("Product added successfully.");

        // Clear the form fields
        this.productName = "";
        this.description = "";
        this.category = "";
        this.price = "";
        this.imageUrl1 = "";
        this.imageUrl2 = "";
      } catch (error) {
        console.error("Error adding product:", error);
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
.product-form {
  text-align: center;
  margin: 20px;
}
.form-group {
  margin-bottom: 10px;
}
</style>
  