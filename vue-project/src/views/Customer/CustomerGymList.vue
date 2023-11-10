<template>
  <div class="customer-gym-list">
    <h2>Gyms</h2>

    <div class="search-bar">
      <label for="search">Search:</label>
      <input type="text" id="search" v-model="searchTerm" />
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
      <select v-model="sortBy" @change="fetchGyms">
        <option value="gymModifiedDateTime">Modified Date</option>
        <option value="price">Gym Price</option>
        <option value="gymName">Gym Name</option>
        <!-- Add other sorting options as needed -->
      </select>

      <label for="sortDirection">Sort Direction:</label>
      <select v-model="sortDirection" @change="fetchGyms">
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

    <ul>
      <li v-for="(gym, index) in filteredGyms" :key="index">
        <h3>{{ gym.gymName }}</h3>
        <p><strong>Address:</strong> {{ gym.address }}</p>
        <p><strong>Postal Code:</strong> {{ gym.postalCode }}</p>
        <p><strong>Contact Number:</strong> {{ gym.contactNumber }}</p>
        <p><strong>Operational Hours:</strong> {{ gym.operationalHours }}</p>
        <p><strong>Price:</strong> ${{ gym.price.toFixed(2) }}</p>
        <p><strong>Website:</strong> {{ gym.website }}</p>
        <p><strong>Amenities:</strong> {{ gym.amenities }}</p>
        <p><strong>Social Media Links:</strong> {{ gym.socialMediaLinks }}</p>

        <!-- Display gym images -->
        <p><strong>Images:</strong></p>
        <ul>
          <li v-for="(imageUrl, i) in gym.uploadedImageUrls" :key="i">
            <img :src="imageUrl" alt="Gym Image" />
          </li>  
          <li v-for="(imageUrl, i) in gym.imageUrls" :key="i">
            <img :src="imageUrl" alt="Gym Image" />
          </li>
        </ul>
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
      // Apply filters based on minPrice and maxPrice
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
        // When sortDirection changes, re-sort the filteredGyms
        this.sortGyms();
      },
    },
  },
};
</script>

<style scoped>
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
</style>
