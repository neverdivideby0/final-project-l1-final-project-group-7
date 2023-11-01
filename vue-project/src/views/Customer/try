<template>
  <div class="customer-home-page">
    <h1>Welcome to Customer Home</h1>
    <p>Hello, {{ userName }}!</p>

    <!-- Display the user's profile picture -->
    <img :src="profilePictureUrl" alt="Profile Picture" class="profile-picture" />

    <div class="user-details">
      <h2>Your Details</h2>
      <p><strong>Full Name:</strong> {{ userFullName }}</p>
      <p><strong>Mobile Number:</strong> {{ userMobileNumber }}</p>
      <p><strong>Delivery Address:</strong> {{ userDeliveryAddress }}</p>
      <p><strong>Account Created Date Time:</strong> {{ userAccountCreatedDateTime }}</p>
    </div>

    <button @click="navigateToProductListing">See all products</button>

  </div>
  <LogOut />

</template>

<script>
import LogOut from '@/components/LogOut.vue';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default {
  name: 'CustomerHomePage',
  components: {
    LogOut,
  },
  data() {
    return {
      userName: '',
      userFullName: '',
      userMobileNumber: '',
      userDeliveryAddress: '',
      userAccountCreatedDateTime: '',
      profilePictureUrl: '', // Store the profile picture URL
    };
  },
  async created() {
    const auth = getAuth();

    // Check if the user is authenticated
    if (auth.currentUser) {
      console.log('User is authenticated');
    } else {
      console.log('User is not authenticated');
    }

    // Fetch and set the user's name (you can adapt this to your authentication system)
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userName = user.displayName || 'User'; // Use the user's display name or a default

        // Fetch the user's details from Firestore
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);

        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            this.userFullName = userData.fullName || 'N/A';
            this.userMobileNumber = userData.mobileNumber || 'N/A';
            this.userDeliveryAddress = userData.deliveryAddress || 'N/A';
            this.userAccountCreatedDateTime = userData.accountCreatedDateTime || 'N/A';
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }

        // Fetch the user's profile picture from Firebase Storage
        const storage = getStorage();
        const profilePictureRef = ref(storage, `profile_pictures/${user.uid}`);

        try {
          const profilePictureUrl = await getDownloadURL(profilePictureRef);
          this.profilePictureUrl = profilePictureUrl;
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      }
    });
  },
  methods: {
    navigateToProductListing() {
      this.checkAuthentication(() => {
        // If authenticated, navigate to BusinessProductListing
        this.$router.push({ name: 'CustomerProductList' });
      });
    },
    checkAuthentication(callback) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is authenticated
          callback();
        } else {
          // User is not authenticated, you can handle this case here
          console.log('User is not authenticated');
        }
      });
    },
  },
};
</script>


<style scoped>
.customer-home-page {
  text-align: center;
  margin: 20px;
}

.user-details {
  margin-top: 20px;
}

.profile-picture {
  width: 100px; /* Adjust the width and height as needed */
  height: 100px;
  border-radius: 50%; /* Make it circular */
}
</style>
