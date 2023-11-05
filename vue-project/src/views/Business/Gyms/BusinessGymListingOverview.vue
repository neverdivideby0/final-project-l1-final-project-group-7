<template>
  <div class="gym-list">
    <!-- Sorting Dropdown -->
    <div class="sorting-options">
      <label for="sortBy">Sort By:</label>
      <select v-model="sortBy" @change="fetchGyms">
        <option value="gymModifiedDateTime">Modified Date</option>
        <h2>Gym Listings</h2>
        <!-- Add other sorting options as needed -->
      </select>

      <label for="sortDirection">Sort Direction:</label>
      <select v-model="sortDirection" @change="fetchGyms">
        <option value="earliest">Earliest</option>
        <option value="latest">Latest</option>
      </select>
    </div>
    <ul>
      <li v-for="(gym, index) in filteredGyms" :key="index" class="gym-listing">
        <!-- Add a gym number to each listing -->
        <span class="gym-number">{{ index + 1 }}</span>
        <div class="gym-details">
          <h3>{{ gym.gymName }}</h3>
          <p><strong>Description:</strong> {{ gym.description }}</p>
          <p><strong>Address:</strong> {{ gym.address }}</p>
          <p><strong>Postal Code:</strong> {{ gym.postalCode }}</p>
          <p><strong>Contact Number:</strong> {{ gym.contactNumber }}</p>
          <p><strong>Operational Hours:</strong> {{ gym.operationalHours }}</p>
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
          <p><strong>Gym Image:</strong></p>
          <ul class="gym-images">
            <li v-for="(imageUrl, i) in gym.imageUrls" :key="i">
              <img :src="imageUrl" alt="Gym Image" class="gym-image" />
            </li>
          </ul>
          <ul class="gym-images">
            <li v-for="(uploadedImageUrl, i) in gym.uploadedImageUrls" :key="i">
              <img
                :src="uploadedImageUrl"
                alt="Uploaded Gym Image"
                class="gym-image"
              />
            </li>
          </ul>
        </div>
        <div class="product-actions">
          <button @click="confirmDelete(gym)">Delete</button>
          <button @click="openEditModal(gym)">Edit</button>
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
</template>
  
  
  
  <script>
import EditGymModal from "@/views/Business/Gyms/EditGymModal.vue";
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
  },
  data() {
    return {
      gyms: [],
      user: null,
      isEditModalOpen: false,
      editingGym: null,
      sortBy: "gymModifiedDateTime", // Initial sorting by gymModifiedDateTime
      sortDirection: "earliest",
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
        const dateA = a[this.sortBy];
        const dateB = b[this.sortBy];

        if (this.sortDirection === "earliest") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
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
.gym-list {
  text-align: center;
  margin: 20px;
}

/* Style for each gym listing */
.gym-listing {
  border: 1px solid #ddd;
  margin: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Style for gym number */
.gym-number {
  font-size: 24px;
  margin-right: 20px;
}

.gym-details {
  flex: 1; /* Expand to fill available space */
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
}
</style>