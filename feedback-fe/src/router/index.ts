import { createRouter, createWebHistory } from 'vue-router';
import FeedbackForm from '@/pages/FeedbackForm.vue';
import FeedbackListing from '@/pages/FeedbackListing.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/list',
    },
    {
      path: '/list',
      name: 'feedbackList',
      component: FeedbackListing,
    },
    {
      path: '/new-feedback',
      name: 'newFeedback',
      component: FeedbackForm,
    },
  ],
});

export default router;
