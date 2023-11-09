<template>
  <div class="profile-setup-page-customer">
    
    <div class="Banner"></div>
    <div class="buttonDiv">
      <SignOutButton />
    </div>
    <div class="Dashboard">
      <img class="dashboard-image" src="@/assets/GetFittSmall.png" alt="GetFitt Logo" />
    </div>
    <div class="Background">
      <div class="Rectangle">
        <h1>Customer Profile Setup</h1>
        <form @submit.prevent="saveProfile">
          <div class="form-group">
            <label for="fullName">Full Name:</label>
            <input type="text" id="fullName" v-model="fullName" required />
          </div>
          <div class="form-group">
            <label for="mobileNumber">Mobile Number:</label>
            <input type="text" id="mobileNumber" v-model="mobileNumber" required />
          </div>
          <div class="form-group">
            <label for="deliveryAddress">Delivery Address:</label>
            <textarea id="deliveryAddress" v-model="deliveryAddress" required></textarea>
          </div>
          <div class="form-group">
            <label for="profilePicture">Profile Picture:</label>
            <input type="file" id="profilePicture" @change="onFileChange" />
            <button type="submit" class="wide-button">Save Profile</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import SignOutButton from '@/components/SignOutButton.vue';
import GoLandingPage from '@/components/GoLandingPage.vue';

export default {
  name: 'ProfileSetupPageCustomer',
  components: {
    SignOutButton,
    GoLandingPage,
  },
  data() {
    return {
      fullName: '',
      mobileNumber: '',
      deliveryAddress: '',
      email: '',
      profilePictureFile: null,
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.email = user.email;
      }
    });
  },
  methods: {
    saveProfile() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const db = getFirestore();
          const userDocRef = doc(db, 'customers', user.uid);

          const userProfile = {
            fullName: this.fullName,
            mobileNumber: this.mobileNumber,
            deliveryAddress: this.deliveryAddress,
            accountCreatedDateTime: new Date(),
            email: this.email,
          };

          setDoc(userDocRef, userProfile)
            .then(() => {
              if (this.profilePictureFile) {
                this.uploadProfilePicture(user.uid);
              } else {
                alert('Profile data saved successfully.');
                this.$router.push({ name: 'CustomerHomePage' });
              }
            })
            .catch((error) => {
              console.error('Error saving profile data:', error);
            });
        }
      });
    },
    onFileChange(e) {
      this.profilePictureFile = e.target.files[0];
    },
    uploadProfilePicture(userId) {
      const storage = getStorage();
      const profilePictureRef = ref(storage, `profile_pictures/${userId}`);

      uploadBytes(profilePictureRef, this.profilePictureFile)
        .then(() => {
          alert('Profile data and profile picture saved successfully.');
          this.$router.push({ name: 'CustomerHomePage' });
        })
        .catch((error) => {
          console.error('Error uploading profile picture:', error);
        });
    },
  },
};
</script>

<style scoped>
.profile-setup-page-customer {
  top: 100px;
  color: black;
}
.Banner {
  height: 90px;
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  background: #FF5733;
}
.Background {
  background: rgba(0, 108, 228, 0.10);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex: 1;
  padding-bottom: 500px; /* Adjust the padding to fill the space below the form */
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

.Rectangle {
  width: 708px;
  background: white;
  border-radius: 30px;
  margin-top: 180px;

}

.dashboard-image {
  max-width: 100%; /* Ensure the image doesn't exceed the width of the parent div */
  max-height: 100%; /* Ensure the image doesn't exceed the height of the parent div */
  display: block; /* Remove any extra space reserved for inline elements */
  margin: 0 auto; /* Center the image horizontally within the parent div */
}
.form-group {
  top: 100px;
}
  .form-group label[for="fullName"] {
    color: red;
  }

  .form-group input#fullName {
    width: 500px;
  }

  .form-group label[for="mobileNumber"] {
    color: red;
  }

  .form-group input#mobileNumber {
    width: 500px;
  }

  .form-group label[for="deliveryAddress"] {
    color: red;
  }

  .form-group textarea#deliveryAddress {
    width: 500px;
  }

  .form-group label[for="profilePicture"] {
    color: red;
  }

  .form-group input[type="file"] {
    width: 240px;
  }

  .wide-button {
    width: 150px;
    display: block;
    margin: 10px auto;
  }
</style>
