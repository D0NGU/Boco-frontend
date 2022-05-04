import { createRouter, createWebHistory } from 'vue-router'
//import Landing from '../views/Landing.vue'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import NotFound from '../views/NotFoundPage.vue'
import Login from '../views/Login'
import RegisterForm from "@/components/RegisterForm";
import DeleteUser from "@/components/UserProfile/DeleteUser";
import ListingDetails from "@/components/Listing/ListingDetails";
import Listing from "@/components/Listing/Listing";
import Contact from "@/components/Contact";
import {getApiClient} from "@/service/ApiService";
import Landing from "@/views/Landing";
import FAQ from "@/components/FAQ";

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: "/register",
    name: "RegisterForm",
    component: RegisterForm
  },
  {
    path: "/deleteUser",
    name: "DeleteUser",
    component: DeleteUser
  },
  {
    path: "/listing/:itemId",
    name: "ListingDetails",
    component: ListingDetails,
    props: true
  },
  {
    path: "/listing/edit/:itemId?",
    name: "Listing",
    component: Listing,
    props: true,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ
  },
  // Redirect any none-existing path to 404 page
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
})

getApiClient.interceptors.response.use(null, error => {
  let path = '/error';
  switch (error.response.status) {
    case 403: 
      path = router.push('/login');  
      return Promise.reject(error);
  }
  return Promise.reject(error);
})

export { routes };
export default router
