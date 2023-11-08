<template>
  <div class="customer-product-list">
    <h2>Products</h2>

    <div class="search-bar">
      <label for="search">Search:</label>
      <input
        type="text"
        id="search"
        v-model="searchTerm"
        @input="searchProducts"
      />
    </div>

    <!-- Filter section -->
    <div class="filter-section">
      <div class="filter-input">
        <label for="minPrice">Min Price:</label>
        <input type="number" id="minPrice" v-model="minPrice" />
      </div>
      <div class="filter-input">
        <label for="maxPrice">Max Price:</label>
        <input type="number" id="maxPrice" v-model="maxPrice" />
      </div>
      <button @click="applyFilters">Search</button>
    </div>

    <div class="sorting-options">
      <label for="sortBy">Sort By:</label>
      <select v-model="sortBy" @change="fetchProducts">
        <option value="productModifiedDateTime">Modified Date</option>
        <!-- Add other sorting options as needed -->
      </select>

      <label for="sortDirection">Sort Direction:</label>
      <select v-model="sortDirection" @change="fetchProducts">
        <option value="latest">Latest</option>
        <option value="earliest">Earliest</option>
      </select>
    </div>
    <ul>
      <li v-for="(product, index) in filteredProducts" :key="index">
        <h3>{{ product.productName }}</h3>
        <p><strong>Description:</strong> {{ product.description }}</p>
        <p><strong>Category:</strong> {{ product.category }}</p>
        <p><strong>Price:</strong> ${{ product.price.toFixed(2) }}</p>
        <p><strong>Business ID:</strong> {{ product.businessId }}</p>
        <p><strong>Email:</strong> {{ product.email }}</p>
        <p><strong>Image URLs:</strong></p>
        <ul>
          <li
            v-for="(imageUrl, i) in [
              ...product.imageUrls,
              ...product.uploadedImageUrls,
            ]"
            :key="i"
          >
            <img :src="imageUrl" alt="Product Image" />
          </li>
        </ul>
        <p>
          <strong>Last Modified:</strong>
          {{ formatDate(product.productModifiedDateTime) }}
        </p>
      </li>
    </ul>
  </div>
</template>
  
  <script>
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  name: "CustomerProductList",
  data() {
    return {
      products: [],
      minPrice: null, // Min price filter
      maxPrice: null, // Max price filter
      filteredProducts: [], // Initialize the filtered products array
      sortBy: "productModifiedDateTime", // Initial sorting by productModifiedDateTime
      sortDirection: "earliest", // Initial sorting direction (latest)
      searchTerm: "", // Add searchTerm property
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    searchProducts() {
      // Apply search based on the searchTerm
      this.filteredProducts = this.products.filter((product) => {
        const searchTerm = this.searchTerm.toLowerCase();
        const productName = product.productName.toLowerCase();
        const description = product.description.toLowerCase();

        // Check if product.category is an array
        const categoryArray = Array.isArray(product.category)
          ? product.category
          : [];

        // Check if searchTerm exists in any of the categoryArray elements
        const categoryMatch = categoryArray.some((category) => {
          return category.toLowerCase().includes(searchTerm);
        });

        return (
          productName.includes(searchTerm) ||
          description.includes(searchTerm) ||
          categoryMatch
        );
      });

      // Sort the filtered products after applying filters and search
      this.sortProducts();
    },

    sortProducts() {
      // Sort the filteredProducts array based on sortBy and sortDirection
      this.filteredProducts.sort((a, b) => {
        const dateA = a[this.sortBy];
        const dateB = b[this.sortBy];

        if (this.sortDirection === "earliest") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
    },

    async fetchProducts() {
      const db = getFirestore();
      const productsCollection = collection(db, "products");

      try {
        const querySnapshot = await getDocs(productsCollection);
        querySnapshot.forEach((doc) => {
          this.products.push(doc.data());
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    applyFilters() {
      // Apply filters based on minPrice and maxPrice
      this.filteredProducts = this.products.filter((product) => {
        if (!this.minPrice && !this.maxPrice) return true;

        const price = product.price;
        if (this.minPrice && this.maxPrice) {
          return price >= this.minPrice && price <= this.maxPrice;
        } else if (this.minPrice) {
          return price >= this.minPrice;
        } else if (this.maxPrice) {
          return price <= this.maxPrice;
        }
      });
      this.sortProducts();
    },
    formatDate(date) {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
  watch: {
    sortDirection() {
      // When sortDirection changes, re-sort the filteredProducts
      this.sortProducts();
    },
  },
};
</script>
  
<style scoped>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet">
.customer-product-list {
  text-align: center;
  margin: 20px;
}

.filter-section {
  margin: 20px;
}

.filter-input {
  margin-right: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ddd;
  margin: 10px;
  padding: 10px;
}

img {
  max-width: 200px;
  max-height: 200px;
}
</style>
  