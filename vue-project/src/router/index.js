import { createRouter, createWebHistory } from "vue-router";
import LandingPage from '@/views/LandingPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import HomePage from '@/views/HomePage.vue'

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: '/SignUpPage',
    name: 'SignUpPage',
    component: SignUpPage
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
