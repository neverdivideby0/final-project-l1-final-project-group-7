<template>
  <div class="customer-gym-list">
    <div class="Banner"></div>
    <div class="Background">
      <h2 class="gyms-heading">Gyms</h2>
      <div class="search-bar">
        <label for="search">Search:</label>
        <input
          type="text"
          id="search"
          v-model="searchTerm"
          @input="searchGyms"
        />
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
        <button @click="applyFilters">Search</button>
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
              <li v-for="(imageUrl, i) in gym.uploadedImageUrls" :key="i">
                <img :src="imageUrl" alt="Gym Image" />
              </li>
            </ul>

            <div class="gym-details">
              <h3>{{ gym.gymName }}</h3>
              <p><strong>Address:</strong> {{ gym.address }}</p>
              <p><strong>Postal Code:</strong> {{ gym.postalCode }}</p>
              <p><strong>Contact Number:</strong> {{ gym.contactNumber }}</p>
              <p>
                <strong>Operational Hours:</strong> {{ gym.operationalHours }}
              </p>
              <p><strong>Price:</strong> ${{ gym.price.toFixed(2) }}</p>
              <p><strong>Website:</strong> {{ gym.website }}</p>
              <p><strong>Amenities:</strong> {{ gym.amenities }}</p>
              <p>
                <strong>Social Media Links:</strong> {{ gym.socialMediaLinks }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet">
.customer-gym-list {
  text-align: center;
  margin: 20px;
}

.gym-listing {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px; /* Adjust padding as needed */
  border: #ff5733 1px solid;
  margin: 20px;
  border-radius: 8px;
}
.search-bar {
  margin-top: 20px; /* Add margin above the search bar */
  width: 570px;
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
  margin: 0;
  padding-bottom: 5px; /* Adjust the padding to fill the space below the form */
}
.gyms-heading {
  font-size: 130px;
  color: white;
  font-family: "Roboto";
  margin-top: 20px;
}
.filter-input {
  margin-bottom: 10px; /* Add margin below each filter input */
}
.filter-section {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  justify-content: space-between;
  width: 570px;
}
.search-button {
  background-color: black;
  align-items: center;
}
.Banner {
  height: 90px;
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  background: orange;
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
  margin-right: 20px; /* Maintain existing margin for spacing */
  margin-left: 690px; /* Add margin to shift images to the right */
}

.gym-image {
  max-width: 150px;
  max-height: 150px;
  z-index: 1;
}

.gym-details {
  flex: 1; /* Expand to fill available space */
  text-align: left;
  margin-left: 20px;
}

.gym-content {
  display: flex;
  align-items: center;
  justify-content: center; /* Center vertically */
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
</style>
