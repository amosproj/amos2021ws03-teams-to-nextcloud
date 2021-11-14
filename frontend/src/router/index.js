import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from '../store';
import Home from '../views/Home.vue'
import Lobby from '../views/Lobby.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true}, // indicates that the user must be authenticated to visit this route
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: Lobby,
    meta: { guest: true } // stops authenticated users from accessing this route
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

/**
 * Checks if the route has the "meta.requiresAuth" tag. 
 * If the route has the tag, we check if the user is authenticated.
 * If he is not, he get rerouted to the lobby
 */
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next('/lobby');
  } else {
    next();
  }
});

/**
 * Checks if the route has the "meta.guest" tag.
 * If the route has the tag, we check if the user is authenticated.
 * If he is, he is not allowed to visit this route and he gets redirected to home
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router
