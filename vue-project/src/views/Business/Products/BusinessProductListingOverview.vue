<template>

  <!-- Overall Background-->
  <div class="Background">
  <!-- Header -->
    <div class="Banner"></div>
    <div class="buttonDiv">
      <SignOutButton />
    </div>

    <div class="Dashboard">
      <img  class="dashboard-image" src="../../../assets/products.png" alt="Products Logo"/>
      Products
    </div>
  <!-- Body -->

  <div class="product-list">

    <!-- Sorting buttons division-->

    <div class="sorting-options">

      <div class = "sort-by">
      <label for="sortBy">Sort By:</label>
      <select v-model="sortBy" @change="fetchProducts">
        <option value="productModifiedDateTime">Modified Date</option>
        <option value="price">Product Price</option>
        <option value="productName">Product Name</option>
        <!-- Add other sorting options as needed -->
      </select>
      </div>

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

    <!-- Product List Itself -->
    <ul>
      <li
        v-for="(product, index) in filteredProducts"
        :key="index"
        class="product-listing"
      >
      <div class = "product-content">

        <!-- Add a product number to each listing -->
        <span class="product-number">{{ index + 1 }}</span>

        <!-- Product Image -->
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

        <!-- Add product details-->
        <div class="product-details">
          <h3>{{ product.productName }}</h3>
          <p><strong>Description:</strong> {{ product.description }}</p>
          <p><strong>Categories:</strong> {{ product.categories }}</p>
          <p><strong>Price:</strong> ${{ product.price.toFixed(2) }}</p>
          <!-- Display business information -->
          <p><strong>Business Name:</strong> {{ product.businessName }}</p>
          <p>
            <strong>Business Address:</strong> {{ product.businessAddress }}
          </p>
          <p><strong>Business Number:</strong> {{ product.businessNumber }}</p>
          <p><strong>Email:</strong> {{ product.email }}</p>


        </div>

        <div class="product-actions">
            <div class = "deleteButton">
            <button @click="confirmDelete(product)">Delete</button>
            </div>

          <div class = "editButton">
            <button @click="openEditModal(product)">Edit</button>
          </div>

        </div>
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
</div>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet">

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
import SignOutButton from "@/components/SignOutButton.vue";

export default {
  name: "ProductList",
  components: {
    EditProductModal,
    SignOutButton,
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
/* Header Styling */

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
  height: 40px; /* Allow the height to adjust based on content */
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
.Background {
  /* position: fixed; */ 
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 108, 228, 0.10); /* Add your background styles */
  z-index: -1;
  overflow: auto;
  /* Remove height property */
}

/* Body CSS */
.sorting-options {
  display: flex; /* Enables flexbox layout */
  align-items: center; /* Aligns items vertically in the center */
  justify-content: flex-start; /* Aligns items to the start of the container */
  gap: 20px; /* Optional: Adds some space between the sorting controls */
}
.sort-by, .sortDirection {
  display: flex; /* This makes the label and dropdown align in a row */
  align-items: center; /* Vertical alignment */
  gap: 10px; /* Optional: Adds space between the label and the dropdown */
}

/* sorting label css */
label {
  margin-bottom: 0px; 
}

.product-list {
  text-align: center;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/* Style for each product listing */
.product-listing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px; /* Adjust padding as needed */
  border: #FF5733 1px solid; /* Add a border to each gym listing */
  margin: 20px;
  border-radius: 8px
}
.product-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
/* Style for product number */
.product-number {
  font-size: 24px;
  margin-right: 20px;
}

.product-details {
  flex: 1; /* Expand to fill available space */
  text-align: left; 
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

/* BUTTON CSS */

.deleteButton {
  margin-bottom: 10px; 
  margin-left: 10px;
}

.editButton {
  margin-left: 10px; 
}


</style>