<template>
  <div class="business-home-page">
    <h1>Welcome to Business Home</h1>
    <p>Hello, {{ userName }}!</p>

    <div class="user-details">
      <h2>Your Details</h2>
      <p><strong>Business Name:</strong> {{ businessName }}</p>
      <p><strong>Business Number:</strong> {{ businessNumber }}</p>
      <p><strong>Business Address:</strong> {{ businessAddress }}</p>
      <p><strong>ACRA ID Number:</strong> {{ acraIdNumber }}</p>
      <p><strong>Account Created:</strong> {{ userAccountCreatedDateTime }}</p>
    </div>

    <div class="profile-picture">
      <img
        v-if="profilePictureUrl"
        :src="profilePictureUrl"
        alt="Profile Picture"
      />
    </div>

    <FootFallChart/>
    <button @click="navigateToBusinessListingOverview">See all listings</button>


    <button @click="navigateToBusinessProductListing">Add new listing</button>

    <LogOut />
  </div>
</template>
  
<script>
import LogOut from "@/components/LogOut.vue";
import FootFallChart from "@/components/FootFallChart.vue";

import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default {
  name: "BusinessHomePage",
  components: {
    LogOut,
    FootFallChart
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
    };
  },async created() {
  const auth = getAuth();

  // Log whether the user is authenticated
  console.log("User authenticated:", !!auth.currentUser);

  // Fetch and set the user's name (you can adapt this to your authentication system)
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      this.userName = user.displayName || "User"; // Use the user's display name or a default

      // Fetch the user's details from Firestore
      const db = getFirestore();
      const userDocRef = doc(db, "businesses", user.uid);

      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          this.businessName = userData.businessName || "N/A";
          this.businessNumber = userData.businessNumber || "N/A";
          this.businessAddress = userData.businessAddress || "N/A";
          this.acraIdNumber = userData.acraIdNumber || "N/A";
          this.userAccountCreatedDateTime =
            userData.accountCreatedDateTime || "N/A";

          // Fetch the profile picture URL from Firebase Storage
          this.fetchProfilePicture(user.uid);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  });
},

  methods: {
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
    navigateToBusinessListingOverview() {
      this.checkAuthentication(() => {
        // If authenticated, navigate to BusinessListingOverview
        this.$router.push({ name: "BusinessListingOverview" });
      });
    },

    navigateToBusinessProductListing() {
      this.checkAuthentication(() => {
        // If authenticated, navigate to BusinessProductListing
        this.$router.push({ name: "BusinessProductListing" });
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
  