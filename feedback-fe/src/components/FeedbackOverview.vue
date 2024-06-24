<script setup lang="ts">
  import { PropType, computed } from 'vue';
  import { defaultFeedback } from '@/utils/feedbackUtils';
  import { calculateMinutesAgo } from '@/utils/dateUtils';
  import { Feedback, FeedbackType } from '@/types/Feedback';

  const props = defineProps({
    feedback: {
      type: Object as PropType<Feedback>,
      required: true,
      default: { ...defaultFeedback }
    },
  });

  const minutesAgo = computed(() => {
    return calculateMinutesAgo(props.feedback.createdAt);
  });
</script>

<template>
  <div class="flex flex-col py-14 max-w-2xl mx-auto text-left">
    <div>
      <p class="text-custom-light-gray text-xs">{{ minutesAgo }} minutes ago</p>
      <div class="flex items-center mt-2 mb-2">
        <img 
          :src="`/src/assets/${feedback.type === FeedbackType.Suggestion ? FeedbackType.Suggestion : FeedbackType.Bug}.svg`"
          alt="Logo"
          class="mr-2"
        >
        <p class="text-2xl text-custom-blue-gray">{{ feedback.title }}</p>
      </div>
      <p class="text-xs text-custom-light-gray mb-3">{{ feedback.name }} ({{ feedback.email }})</p>
      <p class="text-custom-blue-gray">{{ feedback.message }}</p>
    </div>
  </div>
</template>