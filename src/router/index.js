import { createRouter, createWebHistory } from 'vue-router'
//import Landing from '../views/Landing.vue'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import NotFound from '../views/notFound.vue'
import Login from '../views/Login'
import RegisterForm from "@/components/RegisterForm";
import DeleteUser from "@/components/UserProfile/DeleteUser";
import ListingDetails from "@/components/Listing/ListingDetails";
import Listing from "@/components/Listing/Listing";
import EditListing from "@/views/EditListing";
import {getApiClient} from "@/service/ApiService";

const routes = [
  /*{
    path: '/',
    name: 'Landing',
    component: Landing
  },
*/
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
    path: "/listing",
    name: "Listing",
    component: Listing
  },
  {
    path: "/listing/edit/:itemId",
    name: "ListingEdit",
    component: EditListing,
    props: true,
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
    case 403: path = '/login'; break;
    case 404: path = '/login'; break;
  }

  router.push(path);
  return Promise.reject(error);
})

export { routes };

export default router
