<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { defaultFeedback } from '@/utils/feedbackUtils';
  import { getAllFeedback } from '@/api/feedbackService';
  import FeedbackList from '@/components/FeedbackList.vue';
  import FeedbackOverview from '@/components/FeedbackOverview.vue';
  import { Feedback } from '@/types/Feedback';

  const selectedFeedback =  ref<Feedback>({ ...defaultFeedback });
  const feedbackList = ref<Feedback[]>([]);
  const currentPage = ref<number>(1);
  const pageSize = 10;

  const selectItem = (item: Feedback) => {
    selectedFeedback.value = item;
  }

  onMounted(async () => {
    feedbackList.value = await getAllFeedback(currentPage.value, pageSize);
    const [defaultItem] = feedbackList.value;

    selectItem(defaultItem);
  });
</script>

<template>
  <div class="flex h-full">
    <div class="w-1/4 bg-custom-white-gray">
      <feedback-list :feedback-list="feedbackList" @selectItem="selectItem" :selected-item="selectedFeedback" />
    </div>
    <div class="w-3/4 px-4 justify-center flex">
      <feedback-overview :feedback="selectedFeedback" />
    </div>
  </div>
</template>