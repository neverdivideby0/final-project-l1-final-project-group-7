import CustomerHomePage from '@/views/Customer/CustomerHomePage.vue'
import CompanyProfile from '@/views/CompanyProfile.vue'
import EditCompanyProfile from '@/views/EditCompanyProfile.vue'
import HomePage from '@/views/HomePage.vue'
import { requireAuth } from './index'; // Adjust the path as needed


export default [
  {
    path: '/CustomerHomePage',
    name: 'CustomerHomePage',
    component: CustomerHomePage,
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
];
