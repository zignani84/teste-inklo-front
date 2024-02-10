// Em src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import DevelopersList from '../views/DevelopersList.vue';
import DeveloperDetails from '../views/DeveloperDetails.vue';

const routes = [
  {
    path: '/',
    name: 'DevelopersList',
    component: DevelopersList
  },
  {
    path: '/developers/:login',
    name: 'DeveloperDetails',
    component: DeveloperDetails
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
