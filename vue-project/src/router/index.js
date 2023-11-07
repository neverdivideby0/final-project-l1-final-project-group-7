import { createRouter, createWebHistory } from "vue-router";
import LandingPage from '@/views/Auth/LandingPage.vue'
import SignUpPage from '@/views/Auth/SignUpPage.vue'
import EmailVerificationPage from '@/views/Auth/EmailVerificationPage.vue'
import EmailConfirmationPage from "@/views/Auth/EmailConfirmationPage.vue";
import ProfileSetupPageCustomer from "@/views/Customer/ProfileSetupPageCustomer.vue";
import ProfileSetupPageBusiness from "@/views/Business/ProfileSetupPageBusiness.vue";
import CustomerHomePage from '@/views/Customer/CustomerHomePage.vue'
import BusinessHomePage from '@/views/Business/BusinessHomePage.vue'
import AddProductListing from '@/views/Business/Products/AddProductListing.vue'
import BusinessProductListingOverview from '@/views/Business/Products/BusinessProductListingOverview.vue'
import EditCompanyProfile from '@/views/Business/EditCompanyProfile.vue'
import NotFound from '@/views/NotFound.vue'
import EditBusinessProfile from '@/views/Business/EditBusinessProfile.vue'
import CustomerProductList from '@/views/Customer/CustomerProductList.vue'
import CustomerGymList from '@/views/Customer/CustomerGymList.vue'
import AddGymListing from '@/views/Business/Gyms/AddGymListing.vue'
import BusinessGymListingOverview from '@/views/Business/Gyms/BusinessGymListingOverview.vue'

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
    path: '/EditCompanyProfile',
    name: 'EditCompanyProfile',
    component: EditCompanyProfile,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/AddProductListing',
    name: 'AddProductListing',
    component: AddProductListing,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/BusinessProductListingOverview',
    name: 'BusinessProductListingOverview',
    component: BusinessProductListingOverview,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/EditBusinessProfile',
    name: 'EditBusinessProfile',
    component: EditBusinessProfile,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/CustomerProductList',
    name: 'CustomerProductList',
    component: CustomerProductList,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/AddGymListing',
    name: 'AddGymListing',
    component: AddGymListing,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/BusinessGymListingOverview',
    name: 'BusinessGymListingOverview',
    component: BusinessGymListingOverview,
    beforeEnter: requireAuth, // Requires authentication
  },
  {
    path: '/CustomerGymList',
    name: 'CustomerGymList',
    component: CustomerGymList,
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
