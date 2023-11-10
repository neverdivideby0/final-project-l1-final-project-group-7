<template>
  <div class="customer-product-list">
      <div class="banner"></div>
    <h2 class="products-heading">Products</h2>
    <div class="search-bar">
      <label for="search">Search:</label>
      <input
        type="text"
        id="search"
        v-model="searchTerm"
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
      <select v-model="sortBy" @change="applyFilters">
        <option value="productModifiedDateTime">Modified Date</option>
        <option value="price">Product Price</option>
        <option value="productName">Product Name</option>
        <!-- Add other sorting options as needed -->
      </select>

      <label for="sortDirection">Sort Direction:</label>
      <select v-model="sortDirection" @change="applyFilters">
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

    <ul>
      <li v-for="(product, index) in (filteredProducts.length > 0 ? filteredProducts : products)" :key="index">
        <h3>{{ product.productName }}</h3>
        <p><strong>Description:</strong> {{ product.description }}</p>
        <p><strong>Category:</strong> {{ product.category }}</p>
        <p><strong>Price:</strong> ${{ product.price.toFixed(2) }}</p>
        <p><strong>Business Name:</strong> {{ product.businessName }}</p>
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
      this.sortProducts()
    },
    applyFilters() {
      // Apply filters based on minPrice and maxPrice
      this.filteredProducts = this.products.filter((product) => {
        const searchTerm = this.searchTerm.toLowerCase();
        const productName = product.productName.toLowerCase();
        const description = product.description.toLowerCase();

        const matchesSearchTerm =
          productName.includes(searchTerm) || description.includes(searchTerm);

        // Check if the product falls within the specified price range (if minPrice and/or maxPrice is specified)
        const priceInRange =
          (!this.minPrice || product.price >= this.minPrice) &&
          (!this.maxPrice || product.price <= this.maxPrice);

        // Return true if both conditions are met (search term and price range)
        return priceInRange && matchesSearchTerm;
      });
      this.sortProducts();
    },
    sortProducts() {
      // Use JavaScript's sort method to sort r array
      this.filteredProducts.sort((a, b) => {
        const propA = a[this.sortBy];
        const propB = b[this.sortBy];
        console.log("sorting")

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
.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
      z-index: -999; 
  width: 100%;
  background-color: orange; /* Replace with your desired color */
  padding: 169px; /* Adjust the padding as needed */
  box-sizing: border-box;
  color: orange; /* Set text color to contrast with the background */
  text-align: center;
  font-size: 24px; /* Adjust the font size as needed */
  font-weight: bold;   
}

.products-heading {
  font-size: 69px;
  color: white;
  font-family: 'Roboto';
}
</style>
  