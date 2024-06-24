<script setup lang="ts">
  import { computed } from 'vue';
  import { ButtonTypes } from '@/types/Buttons';

  const props = defineProps({
    mode: { 
      type: String as () => ButtonTypes,
      required: true,
      default: () => ButtonTypes.Primary,
    },
  });

  const buttonClass = computed(() => {
      switch (props.mode) {
        case ButtonTypes.Primary:
            return 'bg-custom-green text-white button-primary';
        case ButtonTypes.Secondary:
            return 'bg-custom-gray color-custom-blue-gray button-secondary';
      }
  });
</script>

<template>
  <button :class="buttonClass" class="px-4 py-2 text-sm border rounded button">
    <slot />
  </button>
</template>

<style scoped>
  .button {
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  .button:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  .button-primary:hover {
    background-color: #2CB67D;
  }

  .button-secondary:hover {
    background-color: #CED4E0;
  }
</style>

