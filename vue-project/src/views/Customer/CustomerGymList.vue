<template>

  <div class="customer-gym-list">
    <div class="Banner">
      <h1 class="products-heading">Gyms</h1>
    </div>
    <div class="Background">
  </div>

    <!-- Search Bar -->
    <div class="search-bar">
      <label for="search">Gym Name:</label>
      <input type="text" id="search" v-model="searchTerm" @input="searchGyms" />
    </div>

    <!-- Filter Section -->
    <div class="filter-section">
      <div class="filter-input">
        <label for="minPrice">Min Price:</label>
        <input type="number" id="minPrice" v-model="minPrice" />
      </div>
      <div class="filter-input">
        <label for="maxPrice">Max Price:</label>
        <input type="number" id="maxPrice" v-model="maxPrice" />
      </div>
      <button @click="applyFilters" id="search-button">Search Gyms</button>
    </div>


    <div class="sorting-options">
      <label for="sortBy">Sort By:</label>
      <select v-model="sortBy" @change="applyFilters">
        <option value="gymModifiedDateTime">Modified Date</option>
        <option value="price">Gym Price</option>
        <option value="gymName">Gym Name</option>
        <!-- Add other sorting options as needed -->
      </select>

      <label for="sortDirection">Sort Direction:</label>
      <select v-model="sortDirection" @change="applyFilters">
        <option value="earliest" v-if="sortBy === 'gymModifiedDateTime'">
          Earliest
        </option>
        <option value="latest" v-if="sortBy === 'gymModifiedDateTime'">
          Latest
        </option>
        <option value="highest" v-if="sortBy === 'price'">
          Highest to Lowest
        </option>
        <option value="lowest" v-if="sortBy === 'price'">
          Lowest to Highest
        </option>
        <option value="atoz" v-if="sortBy === 'gymName'">A to Z</option>
        <option value="ztoa" v-if="sortBy === 'gymName'">Z to A</option>
      </select>
    </div>

    <!-- Gym Listings -->
    <ul>
      <li v-for="(gym, index) in (filteredGyms.length > 0 ? filteredGyms : gyms)" :key="index">
        <div class="gym-content">
          <span class="gym-number">{{ index + 1 }}</span>
          
          <ul class="gym-images">
          <li v-for="(uploadedImageUrl, i) in gym.uploadedImageUrls" :key="i">
            <img :src="uploadedImageUrl" alt="Gym Image" />
          </li>
        </ul>

        <div class="gym-details">
       <h3>{{ gym.gymName }}</h3>
        <p><strong>Address:</strong> {{ gym.address }}</p>
        <p><strong>Postal Code:</strong> {{ gym.postalCode }}</p>
        <p><strong>Contact Number:</strong> {{ gym.contactNumber }}</p>
        <p><strong>Operational Hours:</strong> {{ gym.operationalHours }}</p>
        <p><strong>Price:</strong> ${{ gym.price.toFixed(2) }}</p>
        <p><strong>Website:</strong> {{ gym.website }}</p>
        <p><strong>Amenities:</strong> {{ gym.amenities }}</p>
        <p><strong>Social Media Links:</strong> {{ gym.socialMediaLinks }}</p>
        </div>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  name: "CustomerGymList",
  data() {
    return {
      gyms: [], // Initialize the array to store gym data
      searchTerm: "", // Initialize search term
      filteredGyms: [], // Initialize the filtered gyms array
      minPrice: null, // Min price filter
      maxPrice: null, // Max price filter
      sortBy: "gymModifiedDateTime", // Initial sorting by gymModifiedDateTime
      sortDirection: "earliest", // Initial sorting direction (latest)
    };
  },
  created() {
    this.fetchGyms();
  },
  methods: {
    sortGyms() {
      // Use JavaScript's sort method to sort filteredGyms array
      this.filteredGyms.sort((a, b) => {
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

        if (this.sortBy === "gymName") {
          // Case-insensitive comparison for gymName
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

    async fetchGyms() {
      const db = getFirestore();
      const gymsCollection = collection(db, "gyms");

      try {
        const querySnapshot = await getDocs(gymsCollection);
        querySnapshot.forEach((doc) => {
          this.gyms.push(doc.data());
        });
      } catch (error) {
        console.error("Error fetching gyms:", error);
      }
      this.sortGyms();
    },

    applyFilters() {
      this.filteredGyms = this.gyms.filter((gym) => {
        const searchTerm = this.searchTerm.toLowerCase();
        const gymName = gym.gymName.toLowerCase();
        const address = gym.address.toLowerCase();
        const description = gym.description.toLowerCase();
        const amenities = gym.amenities.toLowerCase();
        const price = gym.price;

        // Check if the gym matches the search term
        const matchesSearchTerm =
          gymName.includes(searchTerm) ||
          address.includes(searchTerm) ||
          amenities.includes(searchTerm) ||
          description.includes(searchTerm);

        // Check if the gym falls within the price range (if minPrice and/or maxPrice is specified)
        const priceInRange =
          (!this.minPrice || price >= this.minPrice) &&
          (!this.maxPrice || price <= this.maxPrice);

        // Return true if both conditions are met (search term and price range)
        return matchesSearchTerm && priceInRange;
      });
      this.sortGyms();
    },
    watch: {
    sortDirection() {
      // When sortDirection changes, re-sort the filteredProducts
      this.sortProducts();
    },
  },
  },
};
</script>

<style scoped>
.gym-listing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px; /* Adjust padding as needed */
  border: #FF5733 1px solid; /* Add a border to each gym listing */
  margin: 20px;
  border-radius: 8px
}

.Background {
  position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 108, 228, 0.10); /* Add your background styles */
    z-index: -1;
  /* Remove height property */
}
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
.Banner {
  height: 90px;
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  background: orange;
}
.dashboard-image {
  max-width: 100%; /* Ensure the image doesn't exceed the width of the parent div */
  max-height: 100%; /* Ensure the image doesn't exceed the height of the parent div */
  display: block; /* Remove any extra space reserved for inline elements */
  margin: 0 auto; /* Center the image horizontally within the parent div */
}
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

.customer-gym-list {
  text-align: center;
  margin: 20px;
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

.gym-images {
  list-style-type: none;
  padding: 0;
}

.gym-image {
  max-width: 150px;
  max-height: 150px;
  z-index: 1;
}

.gym-details {
  flex: 1; /* Expand to fill available space */
  text-align: left; 
}

.gym-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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

.search-bar {
  margin-top: 80px; 
}

.filter-section {
    margin-top: 20px;
}

.filter-input {
    margin-bottom: 20px;
}

.products-heading {
    color: white;
}

.sorting-options {
    margin-top: 20px;
}

#search {
    width: 50%;
}

#minPrice {
    width: 50%;
}

#maxPrice {
    width: 50%;
}

#search-button {
    width: 51%;
    align: center;
}
</style>
