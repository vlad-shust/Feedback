<script setup lang="ts">
import { ref, computed } from 'vue';
import { PropType } from 'vue';
import { Feedback } from '@/types/Feedback';
import { defaultFeedback } from '@/utils/feedbackUtils';
import FeedbackItem from '@/components/FeedbackItem.vue';

const props = defineProps({
  feedbackList: {
    type: Array as PropType<Feedback[]>,
    required: true,
  },
  selectedItem: {
    type: Object as PropType<Feedback>,
    required: true,
    default: () => defaultFeedback,
  },
});

const sortDirections: Record<'asc' | 'desc', 'asc' | 'desc'> = {
  asc: 'desc',
  desc: 'asc',
};

const reporterSortDirection = ref<'asc' | 'desc'>('asc');
const dateSortDirection = ref<'asc' | 'desc'>('desc');

const toggleSortDirection = (direction: typeof reporterSortDirection | typeof dateSortDirection) => {
  direction.value = sortDirections[direction.value];
};

const sortByReporter = () => {
  toggleSortDirection(reporterSortDirection);
};

const sortByDate = () => {
  toggleSortDirection(dateSortDirection);
};

const sortedFeedbackList = computed(() => {
  return [...props.feedbackList].sort((a, b) => {
    if (reporterSortDirection.value === 'asc' && dateSortDirection.value === 'desc') {
      return a.name.localeCompare(b.name);
    } else if (reporterSortDirection.value === 'desc' && dateSortDirection.value === 'desc') {
      return b.name.localeCompare(a.name);
    } else if (dateSortDirection.value === 'asc') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
});
</script>

<template>
  <div class="h-full overflow-auto">
    <div class="flex items-center justify-between px-4 py-2 border border-gray-300 px-4">
    <div class="flex items-center space-x-2">
      <span class="text-xs text-custom-light-gray">Filter</span>
      <button class="flex items-center rounded-md bg-custom-gray px-2 py-1" @click="sortByReporter">
        <span class="text-xs text-custom-light-gray">Reporter</span>
        <svg :class="reporterSortDirection === 'asc' ? '' : 'rotate-180'" class="h-4 w-4 ml-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12l-5-5h10l-5 5z" />
        </svg>
      </button>
    </div>
      <div class="flex-grow"></div>
      <div class="flex items-center space-x-2">
        <span class="text-xs text-custom-light-gray">Sort</span>
        <button class="flex items-center rounded-md bg-custom-gray px-2 py-1" @click="sortByDate">
          <span class="text-xs text-custom-light-gray">Date</span>
          <svg :class="dateSortDirection === 'asc' ? '' : 'rotate-180'" class="h-4 w-4 ml-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12l-5-5h10l-5 5z" />
          </svg>
        </button>
      </div>
    </div>
    <div v-for="item in sortedFeedbackList" :key="item._id" class="mt-3">
      <feedback-item :feedback="item" class="mb-3" @click="$emit('selectItem', item)" :is-selected="item._id === selectedItem._id" />
    </div>
  </div>
</template>
