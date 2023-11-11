<template>
  <div class="customer-product-list">
    <div class="Banner"></div>
    <div class="Background">
      <div class="Rectangle">
            <h2 class="products-heading">Products</h2>
    <div class="search-bar">
      <label for="search">Product Name:</label>
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
    <button class="search-button" @click="applyFilters">Search Products</button>
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
      </div>
    </div>

    <ul>
      <li v-for="(product, index) in (filteredProducts.length > 0 ? filteredProducts : products)" :key="index" class="product-listing">
        <div class="product-content">
          <span class="product-number">{{ index + 1 }}</span>

          <ul class="product-images">
          <li v-for="(uploadedImageUrl, i) in [
              ...product.uploadedImageUrls,
            ]"
            :key="i"
          >
            <img :src="uploadedImageUrl" alt="Product Image" />
          </li>
        </ul>
        <div class="product-details">
        <h3>{{ product.productName }}</h3>
        <p><strong>Description:</strong> {{ product.description }}</p>
        <p><strong>Category:</strong> {{ product.category }}</p>
        <p><strong>Price:</strong> ${{ product.price.toFixed(2) }}</p>
        <p><strong>Business Name:</strong> {{ product.businessName }}</p>
        <p><strong>Email:</strong> {{ product.email }}</p>

        </div>
        </div>

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

.product-listing {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px; /* Adjust padding as needed */
  border: #FF5733 1px solid;
  margin: 20px;

  border-radius: 8px;
}

.filter-section {
  margin: 20px 0;
  margin-right: 40px;
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  justify-content: space-between;
  width: 595px;
}

.filter-input {
  margin-right: 25px;
  margin-bottom: 10px; /* Add margin below each filter input */
}

.search-bar {
  margin-top: 20px; /* Add margin above the search bar */
  width: 570px;
}

.search-button {
  margin-top: 20px;
  background-color: black;
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
.product-content {
  display: flex;
  align-items: center;
  justify-content: center; /* Center vertically */
  width: 100%;
}


img {
  max-width: 200px;
  max-height: 200px;
}
.product-images {
  list-style-type: none;
  padding: 0;
}
.products-heading {
  font-size: 130px;
  color: white;
  font-family: 'Roboto';
  margin-top: 20px;
}
.product-images {
  list-style-type: none;
  padding: 0;
  margin-right: 20px; /* Maintain existing margin for spacing */
  margin-left: 690px; /* Add margin to shift images to the right */
}

.product-details {
  flex: 1; /* Expand to fill available space */
  text-align: left;
  margin-left: 20px; /* Maintain existing margin for spacing */
}

.sorting-options {
  width: 595px;
  align: center;
}


.Background {
  background-color: orange;
  display: flex;
  flex-direction: column;
  top: 0;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex: 1;
  padding-bottom: 5px; /* Adjust the padding to fill the space below the form */
}

.Banner {
  height: 90px;
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  background: orange;
}

</style>
  