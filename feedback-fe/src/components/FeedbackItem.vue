<script setup lang="ts">
  import { PropType, computed } from 'vue';
  import { calculateMinutesAgo } from '@/utils/dateUtils';
  import { Feedback, FeedbackType } from '@/types/Feedback';

  const props = defineProps({
    feedback: {
      type: Object as PropType<Feedback>,
      required: true,
    },

    isSelected: {
      type: Boolean,
      default: false,
    },
  });

  const imagePath = computed(() => {
    const isSuggestion = props.feedback.type === FeedbackType.Suggestion;

    return `/src/assets/${isSuggestion ? 'suggestion' : 'bug'}.svg`;
  });

  const minutesAgo = computed(() => {
    return calculateMinutesAgo(props.feedback.createdAt);
  });
</script>

<template>
  <div class="flex w-full h-full cursor-pointer px-4 py-3" :class="{ 'bg-custom-gray': isSelected }">
    <img :src="imagePath" alt="Logo">
    <div class="block ml-2 w-full">
        <p class="text-custom-blue-gray"> {{ feedback.title }} </p>
        <div class="flex justify-between">
          <p class="text-xs text-custom-light-gray"> {{ feedback.name }} </p>
          <p class="text-xs text-custom-light-gray"> {{ minutesAgo }} min ago </p>
        </div>
    </div>
  </div>
</template>
