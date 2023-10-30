import { createRouter, createWebHistory } from "vue-router";
import LandingPage from '@/views/Auth/LandingPage.vue'
import SignUpPage from '@/views/Auth/SignUpPage.vue'
import EmailVerificationPage from '@/views/Auth/EmailVerificationPage.vue'
import EmailConfirmationPage from "@/views/Auth/EmailConfirmationPage.vue";
import ProfileSetupPageCustomer from "@/views/Customer/ProfileSetupPageCustomer.vue";
import ProfileSetupPageBusiness from "@/views/Business/ProfileSetupPageBusiness.vue";
import CustomerHomePage from '@/views/Customer/CustomerHomePage.vue'
import BusinessHomePage from '@/views/Business/BusinessHomePage.vue'
import BusinessProductListing from '@/views/Business/BusinessProductListing.vue'
import BusinessListingOverview from '@/views/Business/BusinessListingOverview.vue'
import CompanyProfile from '@/views/CompanyProfile.vue'
import EditCompanyProfile from '@/views/EditCompanyProfile.vue'
import HomePage from '@/views/HomePage.vue'
import NotFound from '@/views/NotFound.vue'
//import CustomerGymAndProfile from '@/views/Customer/CustomerGymAndProfile.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const requireAuth = (to, from, next) => {
  const auth = getAuth(); // Initialize Firebase Auth
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is authenticated, allow access to the route
      next();
    } else {
      // User is not authenticated, redirect to the landing page or any other route
      next({ name: 'LandingPage' });
    }
  });
};

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
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: "/ProfileSetupPageBusiness",
    name: "ProfileSetupPageBusiness",
    component: ProfileSetupPageBusiness,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/CustomerHomePage',
    name: 'CustomerHomePage',
    component: CustomerHomePage,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/BusinessHomePage',
    name: 'BusinessHomePage',
    component: BusinessHomePage,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/CompanyProfile',
    name: 'CompanyProfile',
    component: CompanyProfile,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/EditCompanyProfile',
    name: 'EditCompanyProfile',
    component: EditCompanyProfile,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/BusinessProductListing',
    name: 'BusinessProductListing',
    component: BusinessProductListing,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/BusinessListingOverview',
    name: 'BusinessListingOverview',
    component: BusinessListingOverview,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
