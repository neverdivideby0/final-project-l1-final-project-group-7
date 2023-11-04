<template>
  <div class="modal" v-if="isEditModalOpen">
    <div class="modal-content">
      <h2>Edit Product</h2>
      <!-- Input fields for editing product details -->
      <div class="form-group">
        <label for="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          v-model="editingProduct.productName"
        />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="editingProduct.description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="category">Category (Comma-separated):</label>
        <input type="text" id="category" v-model="categories" />
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="editingProduct.price" />
      </div>
      <!-- Display existing images -->
      <div class="form-group">
        <label for="existingImages">Existing Images:</label>
        <ul>
          <li v-for="(imageUrl, i) in editingProduct.imageUrls" :key="i">
            <div class="image-preview">
              <img :src="imageUrl" alt="Image Preview" />
              <button @click="removeImage(i)">Remove</button>
            </div>
          </li>
          <li
            v-for="(uploadedImageUrl, i) in editingProduct.uploadedImageUrls"
            :key="i"
          >
            <div class="image-preview">
              <img :src="uploadedImageUrl" alt="Uploaded Image Preview" />
              <button @click="removeUploadedImage(i)">Remove</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Button to add/replace an image -->
      <div class="form-group">
        <label for="newImageUrl">Add/Replace Image URL:</label>
        <input type="text" id="newImageUrl" v-model="newImageUrl" />
        <button @click="addImage">Add/Replace</button>
      </div>

      <!-- File input for adding/replacing images -->
      <div class="form-group">
        <label for="imageFiles">Add/Replace Images:</label>
        <input
          type="file"
          id="imageFiles"
          @change="uploadImageFiles"
          accept="image/*"
          multiple
        />
      </div>

      <!-- Save Changes button -->
      <button @click="saveChanges">Save Changes</button>

      <!-- Close button to close the modal -->
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>
  
  <script>
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  props: {
    isEditModalOpen: Boolean,
    editingProduct: Object,
    products: Array,
  },
  data() {
    return {
      newImageUrl: "",
      newImageFiles: [],
      categories: "", // Add a data field for categories
    };
  },
  methods: {
    async saveChanges() {
      const db = getFirestore();
      const productDocRef = doc(db, "products", this.editingProduct.id);
      // Split and trim categories
      const categoryArray = this.categories.split(",").map((category) => category.trim());

      // Update the product details
      try {
        await updateDoc(productDocRef, {
          productName: this.editingProduct.productName,
          description: this.editingProduct.description,
          category: categoryArray, // Use the split and trimmed categories
          price: this.editingProduct.price,
          imageUrls: this.editingProduct.imageUrls,
          uploadedImageUrls: this.editingProduct.uploadedImageUrls,
          productModifiedDateTime: new Date(),
        });

        // Alert for a successful update
        alert("Product details updated successfully");

        // Update the local product data to reflect the edited values
        const index = this.products.findIndex(
          (p) => p.id === this.editingProduct.id
        );
        if (index !== -1) {
          this.products[index] = { ...this.editingProduct };
        }

        // Close the modal
        this.closeModal();
      } catch (error) {
        console.error("Error updating product details:", error);
        // Handle the error, e.g., show an error message to the user
      }
    },
    removeImage(index) {
      this.editingProduct.imageUrls.splice(index, 1);
    },
    addImage() {
      if (this.newImageUrl) {
        this.editingProduct.imageUrls.push(this.newImageUrl);
        this.newImageUrl = "";
      }
    },
    async uploadImageFiles(event) {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const storage = getStorage();
        const imagesFolderRef = ref(storage, "product_images");

        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          const fileName = `${user.uid}_${Date.now()}_${file.name}`;
          const imageRef = ref(imagesFolderRef, fileName);

          try {
            await uploadBytes(imageRef, file);
            console.log("pushing", fileName);

            const storageRef = ref(storage, "product_images/" + fileName);
            const downloadURL = await getDownloadURL(storageRef);
            this.editingProduct.uploadedImageUrls.push(downloadURL);
            console.log("thisruns");
          } catch (error) {
            console.error("Error uploading image:", error);
            // Handle the error, e.g., show an error message to the user
          }
        }
      } else {
        // Handle the case when the user is not authenticated (e.g., show an error or redirect to a login page)
      }
    },
    async removeUploadedImage(index) {
      if (this.editingProduct && this.editingProduct.uploadedImageUrls) {
        const imageRef = this.editingProduct.uploadedImageUrls[index];

        if (imageRef) {
          const confirmDeletion = window.confirm(
            "Are you sure you want to delete this image?"
          );

          if (confirmDeletion) {
            const storage = getStorage();
            const imageStorageRef = ref(storage, imageRef);

            try {
              // Delete the object from Firebase Storage
              await deleteObject(imageStorageRef);
              console.log("Image deleted from Firebase Storage");
            } catch (error) {
              console.error(
                "Error deleting image from Firebase Storage:",
                error
              );
            }

            // Remove the URL from the array
            this.editingProduct.uploadedImageUrls.splice(index, 1);
          }
        }
      }
    },

    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
  
<style scoped>
/* Styles for the modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it appears on top of other elements */
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 80%; /* Adjust as needed */
  overflow-y: auto; /* Enable vertical scrolling if the content overflows */
  max-height: 80vh; /* Limit the maximum height to 80% of the viewport height */
}

.form-group {
  margin-bottom: 10px;
}

.image-url {
  display: flex;
  align-items: center;
}

.image-url button {
  margin-left: 10px;
}

.image-preview img {
  max-width: 100%; /* Adjust as needed */
  max-height: 200px; /* Adjust as needed */
}
</style>
