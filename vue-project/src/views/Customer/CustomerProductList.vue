<template>
    <div class="customer-product-list">
      <h2>Products</h2>
      
      <!-- Filter section -->
      <div class="filter-section">
        <div class="filter-input">
          <label for="minPrice">Min Price:</label>
          <input type="number" id="minPrice" v-model="minPrice"/>
        </div>
        <div class="filter-input">
          <label for="maxPrice">Max Price:</label>
          <input type="number" id="maxPrice" v-model="maxPrice" />
        </div>
        <button @click="applyFilters">Search</button>
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
            <li v-for="(imageUrl, i) in [...product.imageUrls, ...product.uploadedImageUrls]" :key="i">
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
      },
    },
  };
  </script>
  
  <style scoped>
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
  