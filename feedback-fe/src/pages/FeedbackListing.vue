<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { defaultFeedback } from '@/utils/feedbackUtils';
  import { getAllFeedback } from '@/api/feedbackService';
  import FeedbackList from '@/components/FeedbackList.vue';
  import FeedbackOverview from '@/components/FeedbackOverview.vue';
  import { Feedback } from '@/types/Feedback';

  const selectedFeedback = ref<Feedback>({ ...defaultFeedback });
  const feedbackList = ref<Feedback[]>([]);
  const selectedPage = ref<number>(1);
  const totalPages = ref<number>(0);
  const pageSize = 9;

  const selectItem = (item: Feedback) => {
    selectedFeedback.value = item;
  };

  const nextPage = async () => {
    selectedPage.value++;

    await loadFeedback();
  };

  const previousPage = async () => {
    selectedPage.value--;

    await loadFeedback();
  }

  const loadFeedback = async () => {
    const { totalPages: total, currentPage, feedbackEntries } = await getAllFeedback(selectedPage.value, pageSize);
   
    feedbackList.value = feedbackEntries;
    totalPages.value = total;
    selectedPage.value = currentPage;

    const [defaultItem] = feedbackList.value;
    selectItem(defaultItem);
  };

  onMounted(loadFeedback);
</script>

<template>
  <div class="flex h-full">
    <div class="w-1/4 bg-custom-white-gray">
      <feedback-list 
        :feedback-list="feedbackList" 
        :selected-item="selectedFeedback" 
        :currentPage="selectedPage"
        :total-pages="totalPages"
        @nextPage="nextPage"
        @previousPage="previousPage"
        @selectItem="selectItem"
      />
    </div>
    <div class="px-4 w-3/4">
      <feedback-overview :feedback="selectedFeedback" />
    </div>
  </div>
</template>
