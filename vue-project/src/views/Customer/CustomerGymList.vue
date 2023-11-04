<template>
    <div class="customer-gym-list">
      <h2>Gyms</h2>
      
      <!-- Filter section (if needed) -->
      <!-- Replace this with your specific filter options for gyms -->
  
      <ul>
        <li v-for="(gym, index) in gyms" :key="index">
          <h3>{{ gym.gymName }}</h3>
          <p><strong>Address:</strong> {{ gym.address }}</p>
          <p><strong>Postal Code:</strong> {{ gym.postalCode }}</p>
          <p><strong>Contact Number:</strong> {{ gym.contactNumber }}</p>
          <p><strong>Operational Hours:</strong> {{ gym.operationalHours }}</p>
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
      };
    },
    created() {
      this.fetchGyms();
    },
    methods: {
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
  