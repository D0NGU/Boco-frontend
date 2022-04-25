import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import NotFound from '../views/notFound.vue'
import Login from '../views/Login'
import Listing from '../views/Listing.vue'
import Edit from "@/components/EditComponent";
import EditListing from "@/views/EditListing"

const routes = [
  {
    path: '/',
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
    path: '/listing',
    name: 'Listing',
    component: Listing
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/editListing',
    name: 'EditListing',
    component: EditListing
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
  routes
})

export default router
