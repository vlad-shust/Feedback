<script setup lang="ts">
  import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="flex flex-col h-screen">
    <Navbar />
    <main class="flex-1 overflow-y-auto">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
  
</style>
