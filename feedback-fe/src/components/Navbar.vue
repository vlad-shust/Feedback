<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import FeedbackButton from '@/components/FeedbackButton.vue'; 
  import { ButtonTypes } from '@/types/Buttons';

  const router = useRouter();
</script>  

<template>
  <nav class="flex justify-between items-center p-4 bg-custom-white-gray">
    <div class="flex items-center space-x-4">
      <img 
        src="/src/assets/logo.svg"
        class="cursor-pointer"
        alt="Logo"
        @click="router.push({ path: '/list' })">
    </div>
    <div class="flex space-x-4">
      <feedback-button 
        :mode="ButtonTypes.Secondary" 
        @click="router.push({ path: '/new-feedback' })">
        New feedback
      </feedback-button>
      <feedback-button 
        :mode="ButtonTypes.Primary"
        @click="router.push({ path: '/list' })">
        All feedback
      </feedback-button>
    </div>
  </nav>
</template>


