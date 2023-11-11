<template>
  <!-- Overall Background-->
  <div class="Background">
    <!-- Header -->
    <div class="Banner"></div>
    <div class="buttonDiv">
      <SignOutButton />
    </div>

    <div class="Dashboard">
      <img
        class="dashboard-image"
        src="../../../assets/dumbell.png"
        alt="Dumbell Logo"
      />
      Gyms
    </div>
    <!-- Body -->
    <!-- Gymlist to encompass the entire body -->

    <div class="gym-list">

      <!-- Sorting Options -->

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

      <!-- Gym List Itself -->
      <ul>
        <li
          v-for="(gym, index) in filteredGyms"
          :key="index"
          class="gym-listing"
        >
          <div class="gym-content">
            <!-- Add a gym number to each listing -->
            <span class="gym-number">{{ index + 1 }}</span>

            <!-- Gym Image-->
            <ul class="gym-images">
              <li
                v-for="(uploadedImageUrl, i) in gym.uploadedImageUrls"
                :key="i"
              >
                <img
                  :src="uploadedImageUrl"
                  alt="Uploaded Gym Image"
                  class="gym-image"
                />
              </li>
            </ul>

            <!-- Add gym details -->
            <div class="gym-details">
              <h3>{{ gym.gymName }}</h3>
              <p><strong>Description:</strong> {{ gym.description }}</p>
              <p><strong>Address:</strong> {{ gym.address }}</p>
              <p><strong>Postal Code:</strong> {{ gym.postalCode }}</p>
              <p><strong>Contact Number:</strong> {{ gym.contactNumber }}</p>
              <p>
                <strong>Operational Hours:</strong> {{ gym.operationalHours }}
              </p>
              <p><strong>Price:</strong> ${{ gym.price.toFixed(2) }}</p>
              <p><strong>Email:</strong> {{ gym.email }}</p>
              <p><strong>Amenities:</strong> {{ gym.amenities }}</p>
              <p>
                <strong>Social Media Links:</strong><br />
                <a
                  v-if="gym.socialMediaLinks"
                  :href="gym.socialMediaLinks"
                  target="_blank"
                  >{{ gym.socialMediaLinks }}</a
                >
                <span v-else>No social media links available</span>
              </p>
            </div>

            <div classs="product-actions">
              <div class="deleteButton">
                <button @click="confirmDelete(gym)">Delete</button>
              </div>
              <div class="editButton">
                <button @click="openEditModal(gym)">Edit</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <EditGymModal
        :isEditModalOpen="isEditModalOpen"
        :editingGym="editingGym"
        :gyms="gyms"
        @close="closeEditModal"
      />
    </div>
  </div>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
    rel="stylesheet"
  />
</template>
  
  
  
<script>
import EditGymModal from "@/views/Business/Gyms/EditGymModal.vue";
import SignOutButton from "@/components/SignOutButton.vue";
import GoLandingPage from "@/components/GoLandingPage.vue";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, deleteObject } from "firebase/storage";

export default {
  name: "GymList",
  components: {
    EditGymModal,
    SignOutButton,
    GoLandingPage,
  },
  data() {
    return {
      gyms: [],
      user: null,
      isEditModalOpen: false,
      editingGym: null,
      sortBy: "", // Initial sorting by gymModifiedDateTime
      sortDirection: "",
    };
  },
  created() {
    // Fetch and display the user's email
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        this.fetchGyms(); // Fetch Gyms after the user is authenticated
      }
    });
  },
  methods: {
    openEditModal(gym) {
      this.editingGym = { ...gym }; // Create a copy of the gym to edit
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      this.editingGym = null; // Clear the editingGym when closing the modal
      this.fetchGyms(); // Fetch Gyms after the user is authenticated
    },
    async fetchGyms() {
      if (this.user) {
        const db = getFirestore();
        const gymsCollection = collection(db, "gyms");

        try {
          // Clear the gyms array before fetching new data
          this.gyms = [];

          const querySnapshot = await getDocs(gymsCollection);
          querySnapshot.forEach((doc) => {
            const gymData = doc.data();
            gymData.id = doc.id; // Store the document ID for later reference
            this.gyms.push(gymData);
          });
        } catch (error) {
          console.error("Error fetching gyms:", error);
        }
      }
      this.sortGyms();
    },

    sortGyms() {
      // Use JavaScript's sort method to sort gyms array
      this.gyms.sort((a, b) => {
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

    confirmDelete(gym) {
      if (window.confirm("Are you sure you want to delete this gym?")) {
        this.deleteGym(gym);
      }
    },
    async deleteGym(gym) {
      if (gym && gym.id) {
        const db = getFirestore();
        const gymDoc = doc(db, "gyms", gym.id);
        try {
          // Delete the document from Firestore
          await deleteDoc(gymDoc);

          // Remove the deleted gym from the gyms array
          const index = this.gyms.findIndex((p) => p.id === gym.id);
          if (index !== -1) {
            this.gym.splice(index, 1);
          }

          // Delete associated files in Firebase Storage
          const storage = getStorage();
          for (const uploadedImageUrl of gym.uploadedImageUrls) {
            const uploadedImageRef = ref(storage, uploadedImageUrl);
            await deleteObject(uploadedImageRef);
          }
        } catch (error) {
          console.error("Error deleting gym:", error);
        }
      }
    },
  },
  computed: {
    filteredGyms() {
      if (this.user) {
        this.sortGyms();
        return this.gyms.filter((gym) => gym.businessId === this.user.uid);
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
  background: rgba(0, 108, 228, 0.1);
}
/* This is the orange banner */
.Banner {
  height: 90px;
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  background: #ff5733;
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
  font-family: "Roboto";
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 108, 228, 0.1); /* Add your background styles */
  z-index: -1;
  overflow: auto; 
  /* Remove height property */
}
/* Body CSS */

/* First the sorting buttons to make them side by side */
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

/* DON'T TOUCH THIS */

.gym-list {
  text-align: center;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/* Then, the gym listing CSS */
.gym-listing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px; /* Adjust padding as needed */
  border: #ff5733 1px solid; /* Add a border to each gym listing */
  margin: 20px;
  border-radius: 8px;
}

/* Style for each gym listing */

/* THIS IS THE CSS TO MAKE IT INTO A ROW */
.gym-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

/* Style for gym number */
.gym-number {
  font-size: 24px;
  margin-right: 20px;
}

.gym-details {
  flex: 1; /* Expand to fill available space */
  text-align: left;
}

.gym-actions {
  text-align: center;
}

.gym-images {
  list-style-type: none;
  padding: 0;
}

/* Style for gym images */
.gym-image {
  max-width: 150px;
  max-height: 150px;
  z-index: 1;
}

.deleteButton {
  margin-bottom: 10px;
  margin-left: 10px;
}

.editButton {
  margin-left: 10px;
}
</style>