<template>
  <div class="business-home-page">
    <h1>Welcome to Business Home</h1>
    <p>Hello, {{ businessName }}!</p>

    <div class="user-details">
      <h2>Your Details</h2>
      <p><strong>Business Number:</strong> {{ businessNumber }}</p>
      <p><strong>Business Address:</strong> {{ businessAddress }}</p>
      <p><strong>ACRA ID Number:</strong> {{ acraIdNumber }}</p>
      <p>
        <strong>Account Created:</strong>
        {{ formatAccountCreatedDate(userAccountCreatedDateTime) }}
      </p>
    </div>

    <div class="profile-picture">
      <img
        v-if="profilePictureUrl"
        :src="profilePictureUrl"
        alt="Profile Picture"
      />
    </div>

    <button @click="navigateToBusinessProductListingOverview">
      See Your Product Listings
    </button>

    <button @click="navigateToAddProductListing">Add New Product</button>

    <button @click="navigateToBusinessGymListingOverview">
      See Your Gym Listings
    </button>

    <button @click="navigateToAddGymListing">Add New Gym</button>

    <button @click="navigateToEditBusinessProfile">
      Edit Business Profile
    </button>

    <FootFallChart /> 

    <LogOut />
  </div>
</template>
  
<script>
import LogOut from "@/components/LogOut.vue";
import FootFallChart from "@/components/FootFallChart.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default {
  name: "BusinessHomePage",
  components: {
    LogOut,
    FootFallChart,
  },
  data() {
    return {
      userName: "",
      businessName: "",
      businessNumber: "",
      businessAddress: "",
      acraIdNumber: "",
      userAccountCreatedDateTime: "",
      profilePictureUrl: null, // To store the URL of the profile picture
      userExistsInBusinessesCollection: false,
    };
  },
  created() {
    this.checkAuthentication(() => {
      this.checkIfUserExistsInBusinessesCollection();
    });
  },

  methods: {
    formatAccountCreatedDate(timestamp) {
      const date = timestamp.toDate()
      return date; // Format the date as a localized string
    },
    async checkIfUserExistsInBusinessesCollection() {
      const auth = getAuth();
      const uid = auth.currentUser.uid;
      const db = getFirestore();
      const businessesCollection = collection(db, "businesses");
      const businessSnapshot = await getDocs(businessesCollection);

      this.userExistsInBusinessesCollection = businessSnapshot.docs.some(
        (doc) => doc.id === uid
      );

      if (!this.userExistsInBusinessesCollection) {
        // User does not exist in the "businesses" collection, redirect to ProfileSetupPageBusiness
        this.$router.push({ name: "ProfileSetupPageBusiness" });
      } else {
        // Fetch the user's details from the "businesses" collection and update data properties
        const businessDocRef = doc(db, "businesses", uid);
        const businessDocSnap = await getDoc(businessDocRef);

        if (businessDocSnap.exists()) {
          const businessData = businessDocSnap.data();
          this.businessName = businessData.businessName || "N/A";
          this.businessNumber = businessData.businessNumber || "N/A";
          this.businessAddress = businessData.businessAddress || "N/A";
          this.acraIdNumber = businessData.acraIdNumber || "N/A";
          this.userAccountCreatedDateTime =
            businessData.accountCreatedDateTime || "N/A";
          this.fetchProfilePicture(uid);
        }
      }
    },

    async fetchProfilePicture(uid) {
      // Fetch the profile picture URL from Firebase Storage
      const storage = getStorage();
      const profilePictureRef = ref(storage, `profile_pictures/${uid}`);

      try {
        const url = await getDownloadURL(profilePictureRef);
        this.profilePictureUrl = url;
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    },
    navigateToBusinessProductListingOverview() {
      this.checkAuthentication(() => {
        // If authenticated, navigate to BusinessProductListingOverview
        this.$router.push({ name: "BusinessProductListingOverview" });
      });
    },

    navigateToAddProductListing() {
      this.checkAuthentication(() => {
        // If authenticated, navigate to BusinessProductListing
        this.$router.push({ name: "AddProductListing" });
      });
    },
    navigateToBusinessGymListingOverview() {
      this.checkAuthentication(() => {
        // If authenticated, navigate to BusinessProductListingOverview
        this.$router.push({ name: "BusinessGymListingOverview" });
      });
    },

    navigateToAddGymListing() {
      this.checkAuthentication(() => {
        // If authenticated, navigate to BusinessProductListing
        this.$router.push({ name: "AddGymListing" });
      });
    },

    navigateToEditBusinessProfile() {
      this.checkAuthentication(() => {
        // If authenticated, navigate to BusinessProductListing
        this.$router.push({ name: "EditBusinessProfile" });
      });
    },

    checkAuthentication(callback) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is authenticated");
          callback();
        } else {
          // User is not authenticated, display an error message or take other actions
          console.log("User is not authenticated");
          this.$router.push({ name: "LoginPage" }); // Redirect to login page
        }
      });
    },
  },
};
</script>
  
  <style scoped>
.business-home-page {
  text-align: center;
  margin: 20px;
}

.user-details {
  margin-top: 20px;
}

.profile-picture {
  margin-top: 20px;
}

.profile-picture img {
  max-width: 200px; /* Adjust the width as needed */
}
</style>
  