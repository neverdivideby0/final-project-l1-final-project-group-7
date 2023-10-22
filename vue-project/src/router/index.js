import { createRouter, createWebHistory } from "vue-router";
import LandingPage from '@/views/LandingPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'

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
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
