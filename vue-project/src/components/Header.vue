<template>
  <header class="header">
    <div class="header-content">
      <h1>GetFitt</h1>
      <p>{{ businessName }}</p>
    </div>

    <button class="sign-out-button" @click="signOut">Sign Out</button>
  </header>
</template>

<script>
import firebase from "../firebase.js";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default {    
    data() {
        return {
            user: null, // Initialize merchant data
            businessName: null, // Initialize merchant name
        };
    },
    created() {
    // Check if the merchant is signed in
        const auth = getAuth(firebase);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                this.fetchUserName(user.uid); 
            }
        });
    },
    methods: {
        fetchUserName(userid) {
            const db = getFirestore(firebase);
            const userRef = doc(db, 'businessUsers', userid)
            getDoc(userRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    this.businessName = userData.businessName;
                }
            })
            .catch((error) => {
                console.error('Error fetching username', error);
            });
        },

        async signOut() {
            const auth = getAuth(firebase);
            
            try {
            await signOut(auth);
            this.$router.push({ name: 'LandingPage' });
            } catch(error) {
                console.error('Error signing out', error);
            }
        }
    }
};
</script>

<style scoped>
.header {
    background-color: #FFA500; /* Dark orange background color */
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-content {
    flex: 1;
}

.sign-out-button {
    background-color: white;
    color: #FFA500; /* Dark orange text color */
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.sign-out-button:hover {
    background-color: #FFD700; /* Lighter orange on hover */
}

</style>