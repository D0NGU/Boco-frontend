import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import NotFound from '../views/notFound.vue'
import Login from '../views/Login'
import RegisterForm from "@/components/RegisterForm";
import DeleteUser from "@/components/DeleteUser";

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
    path: "/register",
    name: "RegisterForm",
    component: RegisterForm
  },
  {
    path: "/deleteUser",
    name: "DeleteUser",
    component: DeleteUser
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
