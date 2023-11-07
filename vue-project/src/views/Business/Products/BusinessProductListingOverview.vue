<template>
  <div class="product-list">
    <div class="sorting-options">
      <label for="sortBy">Sort By:</label>
      <select v-model="sortBy" @change="fetchProducts">
        <option value="productModifiedDateTime">Modified Date</option>
        <option value="price">Product Price</option>
        <option value="productName">Product Name</option>
        <!-- Add other sorting options as needed -->
      </select>

      <label for="sortDirection">Sort Direction:</label>
      <select v-model="sortDirection" @change="fetchProducts">
        <option value="earliest" v-if="sortBy === 'productModifiedDateTime'">
          Earliest
        </option>
        <option value="latest" v-if="sortBy === 'productModifiedDateTime'">
          Latest
        </option>
        <option value="highest" v-if="sortBy === 'price'">
          Highest to Lowest
        </option>
        <option value="lowest" v-if="sortBy === 'price'">
          Lowest to Highest
        </option>
        <option value="atoz" v-if="sortBy === 'productName'">A to Z</option>
        <option value="ztoa" v-if="sortBy === 'productName'">Z to A</option>
      </select>
    </div>

    <h2>Product Listings</h2>

    <!-- Update the product listings -->
    <ul>
      <li
        v-for="(product, index) in filteredProducts"
        :key="index"
        class="product-listing"
      >
        <!-- Add a product number to each listing -->
        <span class="product-number">{{ index + 1 }}</span>
        <div class="product-details">
          <h3>{{ product.productName }}</h3>
          <p><strong>Description:</strong> {{ product.description }}</p>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><strong>Price:</strong> ${{ product.price.toFixed(2) }}</p>
          <!-- Display business information -->
          <p><strong>Business Name:</strong> {{ product.businessName }}</p>
          <p>
            <strong>Business Address:</strong> {{ product.businessAddress }}
          </p>
          <p><strong>Business Number:</strong> {{ product.businessNumber }}</p>
          <p><strong>Email:</strong> {{ product.email }}</p>
          <p><strong>Images</strong></p>
          <ul class="product-images">
            <li v-for="(imageUrl, i) in product.imageUrls" :key="i">
              <img :src="imageUrl" alt="Product Image" class="product-image" />
            </li>
          </ul>
          <ul class="product-images">
            <li
              v-for="(uploadedImageUrl, i) in product.uploadedImageUrls"
              :key="i"
            >
              <img
                :src="uploadedImageUrl"
                alt="Uploaded Product Image"
                class="product-image"
              />
            </li>
          </ul>
        </div>
        <div class="product-actions">
          <button @click="confirmDelete(product)">Delete</button>
          <button @click="openEditModal(product)">Edit</button>
        </div>
      </li>
    </ul>

    <EditProductModal
      :isEditModalOpen="isEditModalOpen"
      :editingProduct="editingProduct"
      :products="products"
      @close="closeEditModal"
    />
  </div>
</template>
  
  
  <script>
import EditProductModal from "@/views/Business/Products/EditProductModal.vue";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, deleteObject } from "firebase/storage";

export default {
  name: "ProductList",
  components: {
    EditProductModal,
  },
  data() {
    return {
      products: [],
      user: null,
      isEditModalOpen: false,
      editingProduct: null,
      sortBy: "productModifiedDateTime", // Initial sorting by productModifiedDateTime
      sortDirection: "earliest", // Initial sorting direction (latest)
    };
  },
  created() {
    // Fetch and display the user's email
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        this.fetchProducts(); // Fetch products after the user is authenticated
      }
    });
  },
  methods: {
    sortProducts() {
      // Use JavaScript's sort method to sort r array
      this.products.sort((a, b) => {
        const propA = a[this.sortBy];
        const propB = b[this.sortBy];

        if (this.sortBy === "price") {
          // Convert prices to numbers for proper comparison
          const priceA = parseFloat(propA);
          const priceB = parseFloat(propB);

          if (this.sortDirection === "highest") {
            return priceB - priceA;
          } else if (this.sortDirection === "lowest") {
            return priceA - priceB;
          }
        }

        if (this.sortBy === "productName") {
          const nameA = propA.toLowerCase();
          const nameB = propB.toLowerCase();

          if (this.sortDirection === "atoz") {
            return nameA.localeCompare(nameB);
          } else if (this.sortDirection === "ztoa") {
            return nameB.localeCompare(nameA);
          }
        }

        // For other cases (Modified Date), compare normally
        return this.sortDirection === "earliest"
          ? propA - propB
          : propB - propA;
      });
    },
    openEditModal(product) {
      this.editingProduct = { ...product }; // Create a copy of the product to edit
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      this.editingProduct = null; // Clear the editingProduct when closing the modal
      this.fetchProducts(); // Fetch products after the user is authenticated

    },
    async fetchProducts() {
      if (this.user) {
        const db = getFirestore();
        const productsCollection = collection(db, "products");

        try {
          const querySnapshot = await getDocs(productsCollection);
          const products = [];

          for (const productDoc of querySnapshot.docs) {
            const productData = productDoc.data();
            productData.id = productDoc.id; // Store the document ID for later reference

            // Fetch business information based on businessId
            const businessDocRef = doc(
              db,
              "businesses",
              productData.businessId
            );
            const businessDocSnap = await getDoc(businessDocRef);

            if (businessDocSnap.exists()) {
              const businessData = businessDocSnap.data();
              productData.businessName = businessData.businessName;
              productData.businessAddress = businessData.businessAddress;
              productData.businessNumber = businessData.businessNumber;
            }

            products.push(productData);
          }

          this.products = products;
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    },

    confirmDelete(product) {
      if (window.confirm("Are you sure you want to delete this product?")) {
        this.deleteProduct(product);
      }
    },
    async deleteProduct(product) {
      if (product && product.id) {
        const db = getFirestore();
        const productDoc = doc(db, "products", product.id);
        try {
          // Delete the document from Firestore
          await deleteDoc(productDoc);

          // Remove the deleted product from the products array
          const index = this.products.findIndex((p) => p.id === product.id);
          if (index !== -1) {
            this.products.splice(index, 1);
          }

          // Delete associated files in Firebase Storage
          const storage = getStorage();
          for (const uploadedImageUrl of product.uploadedImageUrls) {
            const uploadedImageRef = ref(storage, uploadedImageUrl);
            await deleteObject(uploadedImageRef);
          }
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    },
  },
  computed: {
    filteredProducts() {
      if (this.user) {
        this.sortProducts()
                return this.products.filter(
          (product) => product.businessId === this.user.uid
        );
      }

      return [];
    },
  },
};
</script>
  
<style scoped>
.product-list {
  text-align: center;
  margin: 20px;
}

/* Style for each product listing */
.product-listing {
  border: 1px solid #ddd;
  margin: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Style for product number */
.product-number {
  font-size: 24px;
  margin-right: 20px;
}

.product-details {
  flex: 1; /* Expand to fill available space */
}

.product-actions {
  text-align: center;
}

.product-images {
  list-style-type: none;
  padding: 0;
}

/* Style for product images */
.product-image {
  max-width: 150px;
  max-height: 150px;
}
</style>