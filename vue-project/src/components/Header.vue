<template>
  <header class="header">
    <div class="header-content">
      <h1>GetFitt</h1>
      <p>Welcome, {{ businessName }}</p>
    </div>

    <button class="sign-out-button" @click="signOut">Sign Out</button>
  </header>
</template>

<script>
import firebaseApp from "../firebase.js";
import 'firebase/auth';
import 'firebase/database';

export default {
    data() {
        return {
            user: null, // Initialize merchant data
            businessName: null, // Initialize merchant name
        };
    },
    created() {
    // Check if the merchant is signed in
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
                this.fetchUserName(user.uid); 
            }
        });
    },
    methods: {
        fetchUserName(userid) {
            const db = firebase.database();
            const userRef = db.ref('businessUsers/' + userId);
            userRef.once('value')
            .then((snapshot) => {
                const userData = snapshot.val();
                if (userData && userData.name) {
                    this.businessName = userData.name;
                }
            })
            .catch((error) => {
                console.error('Error fetching user name', error);
            });
        },

        signOut() {
            firebase.auth().signOut()
            .then(() => {
            })
            .catch(error => {
                console.error('Error signing out', error);
            });
        },
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