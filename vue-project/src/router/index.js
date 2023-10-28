import { createRouter, createWebHistory } from "vue-router";
import LandingPage from '@/views/LandingPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import HomePage from '@/views/HomePage.vue'
import CompanyProfile from '@/views/CompanyProfile.vue'
import EditCompanyProfile from '@/views/EditCompanyProfile.vue'

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
  },
  {
    path: '/CompanyProfile',
    name: 'CompanyProfile',
    component: CompanyProfile
  },
  {
    path: '/EditCompanyProfile',
    name: 'EditCompanyProfile',
    component: EditCompanyProfile
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
