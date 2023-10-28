import { createRouter, createWebHistory } from "vue-router";
import LandingPage from '@/views/LandingPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import EmailVerificationPage from '@/views/EmailVerificationPage.vue'
import EmailConfirmationPage from "@/views/EmailConfirmationPage.vue";
import ProfileSetupPageCustomer from "@/views/Customer/ProfileSetupPageCustomer.vue";
import ProfileSetupPageBusiness from "@/views/Business/ProfileSetupPageBusiness.vue";
import CustomerHomePage from '@/views/Customer/CustomerHomePage.vue'


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
    path: '/EmailVerificationPage',
    name: 'EmailVerificationPage',
    component: EmailVerificationPage
  },
  {
    path: "/EmailConfirmationPage",
    name: "EmailConfirmationPage",
    component: EmailConfirmationPage,
  },
  {
    path: "/ProfileSetupPageCustomer",
    name: "ProfileSetupPageCustomer",
    component: ProfileSetupPageCustomer,
  },
  {
    path: "/ProfileSetupPageBusiness",
    name: "ProfileSetupPageBusiness",
    component: ProfileSetupPageBusiness,
  },
  {
    path: '/CustomerHomePage',
    name: 'CustomerHomePage',
    component: CustomerHomePage
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
