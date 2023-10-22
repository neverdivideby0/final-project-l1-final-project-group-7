import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import firebaseApp from './firebase.js'; // Import your Firebase app

createApp(App)
  .use(router)
  .provide('firebaseApp', firebaseApp) // Provide your Firebase app to the Vue app
  .mount('#app');
