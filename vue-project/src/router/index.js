import { createRouter, createWebHistory } from "vue-router";
import LandingPage from '@/views/Auth/LandingPage.vue'
import SignUpPage from '@/views/Auth/SignUpPage.vue'
import EmailVerificationPage from '@/views/Auth/EmailVerificationPage.vue'
import EmailConfirmationPage from "@/views/Auth/EmailConfirmationPage.vue";
import ProfileSetupPageCustomer from "@/views/Customer/ProfileSetupPageCustomer.vue";
import ProfileSetupPageBusiness from "@/views/Business/ProfileSetupPageBusiness.vue";
import CustomerHomePage from '@/views/Customer/CustomerHomePage.vue'
import BusinessHomePage from '@/views/Business/BusinessHomePage.vue'

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
  },
  {
    path: '/BusinessHomePage',
    name: 'BusinessHomePage',
    component: BusinessHomePage
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
