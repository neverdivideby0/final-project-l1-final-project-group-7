<template>
  <div class="customer-gym-list">
    <h2>Gyms</h2>

    <div class="search-bar">
      <label for="search">Search:</label>
      <input type="text" id="search" v-model="searchTerm" @input="searchGyms" />
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
        <!-- Add other sorting options as needed -->
      </select>

      <label for="sortDirection">Sort Direction:</label>
      <select v-model="sortDirection" @change="fetchGyms">
        <option value="latest">Latest</option>
        <option value="earliest">Earliest</option>
      </select>
    </div>

    <!-- Filter section (if needed) -->
    <!-- Replace this with your specific filter options for gyms -->

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
    searchGyms() {
      console.log("Search term: ", this.searchTerm);

      // Apply search based on the searchTerm
      this.filteredGyms = this.gyms.filter((gym) => {
        const searchTerm = this.searchTerm.toLowerCase();
        const gymName = gym.gymName.toLowerCase();
        const address = gym.address.toLowerCase();
        const description = gym.description.toLowerCase();
        const amenities = gym.amenities.toLowerCase();

        return (
          gymName.includes(searchTerm) ||
          address.includes(searchTerm) ||
          amenities.includes(searchTerm) ||
          description.includes(searchTerm)
        );
      });

      // Sort the filtered gyms after applying filters and search
      this.sortGyms();
    },

    sortGyms() {
      // Sort the filteredGyms array based on sortBy and sortDirection
      this.filteredGyms.sort((a, b) => {
        const dateA = a[this.sortBy];
        const dateB = b[this.sortBy];

        if (this.sortDirection === "earliest") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
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
      console.log("minPrice:", this.minPrice);
      console.log("maxPrice:", this.maxPrice);
      // Apply filters based on minPrice and maxPrice
      this.filteredGyms = this.gyms.filter((gym) => {
        const price = gym.price;

        if (!this.minPrice && !this.maxPrice) return true;
        if (this.minPrice && this.maxPrice) {
          return price >= this.minPrice && price <= this.maxPrice;
        } else if (this.minPrice) {
          return price >= this.minPrice;
        } else if (this.maxPrice) {
          return price <= this.maxPrice;
        }
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
