<template>
  <!-- The Dashboard and Header Bar -->
  <div class="MenuBar"></div>
  <div class="Banner"></div>
  <div class="buttonDiv">
    <div class="edit-profile-button">
      <button @click="navigateToEditBusinessProfile">Edit Business Profile</button>
    </div>
    <SignOutButton />
  </div>
  <div class="Dashboard">
    <img  class="dashboard-image" src="../../assets/GetFittSmall.png" alt="GetFitt Logo"/>
    Dashboard
  </div>
  <div class="CompanyName"> 
{{ businessName }}
  </div>

  <!-- Everything below here is the body of the page -->
  <div class="business-home-page">

    <!-- Left section for user details -->
    <div class="left-section">
      <h1>Welcome to Business Home</h1>
      <p>Hello, {{ userName }}!</p>
      <div class="user-details">
        <h2>Your Details</h2>
        <div class="profile-picture">
        <img
          v-if="profilePictureUrl"
          :src="profilePictureUrl"
          alt="Profile Picture"
        />
      </div>
        <p><strong>Business Name:</strong> {{ businessName }}</p>
        <p><strong>Business Number:</strong> {{ businessNumber }}</p>
        <p><strong>Business Address:</strong> {{ businessAddress }}</p>
        <p><strong>ACRA ID Number:</strong> {{ acraIdNumber }}</p>
        <p><strong>Account Created:</strong> {{ userAccountCreatedDateTime }}</p>
      </div>


    </div>

    <!-- Right section for footfall chart and buttons -->
    <div class="right-section">
      <div class="chart-container">
        <FootFallChart/>
      </div>
      <div class = "productButtons"> 
        <button @click="navigateToBusinessProductListingOverview">See all Product listings</button>
        <button @click="navigateToAddProductListing">Add new Product</button>
      </div>
      <div class = "gymButtons "> 
        <button @click="navigateToBusinessGymListingOverview">See all Gym listings</button>
        <button @click="navigateToAddGymListing">Add new Gym</button>
       </div>

   </div>
  </div>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet">
</template>
  
<script>
import LogOut from "@/components/LogOut.vue";
import FootFallChart from "@/components/FootFallChart.vue";
import GoLandingPage from "@/components/GoLandingPage.vue";
import SignOutButton from "@/components/SignOutButton.vue";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default {
  name: "BusinessHomePage",
  components: {
    LogOut,
    FootFallChart,
    GoLandingPage,
    SignOutButton,
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
  },
  async created() {
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
        }
      });
    },
  },
};
</script>
  
  <style scoped>
/* Roboto Font */ 
body, h1, h2, h3, p, button  {
  font-family: 'Roboto', sans-serif;
}
/* 4 bottoms code */ 
.productButtons button, .gymButtons button {
  font-family: 'Roboto', sans-serif;
  margin-top: 50px;
  margin-bottom: 10px; /* Add margin to create vertical spacing between buttons */
  margin-left: 50px; /* Add amrgin to create horizontal spacing between buttons */
  border-radius: 8px
}

/* Div Below Banner To Push The Words below banner" */ 
.MenuBar {
  width: 1440px;
  height: 90px;
  position: relative;
}
/* This is the orange banner */ 
.Banner {
  height: 106px;
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  background: #FF5733;
}

/* Sign Out Button Div */ 
.buttonDiv {
  width: 92.14px;
  height: 44px;
  left: 90%;
  top: 60px;
  position: absolute;
  justify-content: flex-end;
  align-items: center;
  display: inline-flex;
}
/* Edit Business Profile Button */
.edit-profile-button {
  margin-right: 10px; /* Add margin to separate the buttons */
}

/* This is the center of the dashboard with logo and dashboard name */
.Dashboard {
  width: 100%; /* Use 100% width to span the entire container */
  height: 54px; /* Allow the height to adjust based on content */
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
.dashboard-image {
  max-width: 100%; /* Ensure the image doesn't exceed the width of the parent div */
  max-height: 100%; /* Ensure the image doesn't exceed the height of the parent div */
  display: block; /* Remove any extra space reserved for inline elements */
  margin: 0 auto; /* Center the image horizontally within the parent div */
}
/* Company Name On Top Right */
.CompanyName {
  left: 78.5%;
  top: 22px;
  position: absolute;
  color: black;
  font-size: 24px;
  font-family: 'Roboto';
  font-weight: 500;
  line-height: 20px;
  word-wrap: break-word;
}

/* Everything below is the body part */
.business-home-page {
  display: flex; /* Use flex layout to create a two-column design */
  /*  flex-wrap: wrap;   Allow items to wrap to the next row on smaller screens */
  justify-content: flex-start; /* Align sections to the left within the page */

}

.left-section {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
}

.profile-picture img {
  max-width: 100%; /* Set a maximum width to prevent it from being too large */
  max-height: 200px; /* Adjust the maximum height as needed */
  display: block; /* Remove any extra space reserved for inline elements */
  margin: 0 auto; /* Center the image horizontally */
}

.right-section {
  flex: 1; /* Allow right section to expand and fill available space */
  padding: 20px; /* Add padding to create separation */
  box-sizing: border-box; /* Include padding within the width */
}

/* For footfall chart */
.chart-container {
  width: 100%; /* Adjust the width as needed */
  max-width: 800px; /* Set a maximum width if necessary */
  height: auto; /* Allow the height to adjust based on content */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center vertically */
  margin: 0 auto; /* Center horizontally */
}

/* button code */ 
button {
  background-color: black; /* Black background color */
  color: #FFF; /* White text color */
  border: 1px solid #FFF; /* Add a white border around the button */
  padding: 5px 10px; /* Adjust the padding as needed */
  cursor: pointer;
  font-size: 14px; /* You can adjust the font size as needed */
  font-family: 'Roboto', sans-serif; /* Specify the Roboto font and fall back to a generic sans-serif font if needed */
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s; /* Smooth transitions on hover */
  width: 200px;
  border-radius: 8px
}

button:hover {
  background-color: #0056b3; /* Background color change on hover */
  color: #FFF; /* Text color remains white on hover */
  border-color: #0056b3; /* Border color change on hover */
}

</style>
  