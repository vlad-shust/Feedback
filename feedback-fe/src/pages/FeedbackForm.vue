<script setup lang="ts">
  import router from '@/router';
  import { ref } from 'vue';
  import { Feedback, FeedbackType } from '@/types/Feedback';
  import { defaultFeedback } from '@/utils/feedbackUtils';
  import { createFeedback } from '@/api/feedbackService';
  import { ButtonTypes } from '@/types/Buttons';
  import FeedbackButton from '@/components/FeedbackButton.vue';

  const TOASTER_TIMEOUT = 2000;

  const feedback = ref<Feedback>({ ...defaultFeedback });
  const showSuccessToast = ref(false);

  const submitFeedback = async () => {
    try {
      await createFeedback(feedback.value);

      feedback.value = { ...defaultFeedback };
      showSuccessToast.value = true;

      setTimeout(() => {
        showSuccessToast.value = false;
      }, TOASTER_TIMEOUT);
    } catch (error) {
      alert('Failed to submit feedback. Please try again later.');
    }
  };
</script>

<template>
  <div class="flex justify-center items-start h-full p-4 bg-custom-white-gray mt-2">
    <transition name="toast" mode="out-in">
      <div v-if="showSuccessToast" key="success-toast" class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-50">
        Feedback submitted successfully!
      </div>
    </transition>
    <form class="w-full max-w-3xl p-6 mt-4 bg-white rounded-xl shadow-md" @submit.prevent="submitFeedback">
      <h2 class="text-custom-blue-gray text-24">Add New Feedback</h2>
      <hr class="mb-4"/>
      <div class="mb-4">
        <label for="name" class="text-custom-blue-gray text-base">Name</label>
        <input
          id="name"
          type="text"
          v-model="feedback.name"
          class="mt-1 block w-72 h-8 px-3 feedback-input"
          required
        />
      </div>
      <div class="mb-4">
        <label for="email" class="text-custom-blue-gray text-base">Email</label>
        <input
          id="email"
          type="email"
          v-model="feedback.email"
          class="mt-1 w-72 block px-3 h-8 feedback-input"
          required
        />
      </div>
      <div class="mb-4">
        <label for="type" class="text-custom-blue-gray text-base">Type</label>
        <select
          id="type"
          v-model="feedback.type"
          class="mt-1 block w-72 px-3 h-8 feedback-input feedback-select text-14 relative appearance-none"
          required
        >
          <option :value="FeedbackType.Bug">{{ FeedbackType.Bug }}</option>
          <option :value="FeedbackType.Suggestion">{{ FeedbackType.Suggestion }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="title" class="text-custom-blue-gray text-base">Title</label>
        <input
          id="title"
          type="text"
          v-model="feedback.title"
          class="mt-1 block w-full px-3 h-8 feedback-input"
          required
        />
      </div>
      <div class="mb-4">
        <label for="message" class="text-custom-blue-gray text-base">Message</label>
        <textarea
          id="message"
          v-model="feedback.message"
          class="mt-1 block w-full px-3 feedback-input"
          rows="4"
          required
        ></textarea>
      </div>
      <div class="flex justify-end space-x-4">
        <feedback-button
          :mode="ButtonTypes.Secondary"
          @click="router.push({ path: '/list' })">
          Discard
        </feedback-button>
        <feedback-button
          type="submit"
          :mode="ButtonTypes.Primary">
          Send feedback 
        </feedback-button>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .feedback-input {
    border-color: #E2E8F0;
    border-width: 1px;
    border-radius: 3px;
  }

  .feedback-select {
    -webkit-appearance: none;  /* Remove default arrow in Safari */
    -moz-appearance: none;     /* Remove default arrow in Firefox */
    appearance: none;          /* Remove default arrow in other browsers */
    background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M10 12l-5-5h10l-5 5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.2rem;
  }
</style>