<script setup lang="ts">
import HomeView from '@/views/HomeView.vue'
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header class="mb-12 text-center">
        <h1
          class="mb-2 text-start text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl lg:text-6xl"
        >
          Auction House
        </h1>
        <p class="text-start text-sm text-slate-600 sm:text-base">
          Premium items, exceptional value
        </p>
      </header>
      <HomeView />
    </div>
  </main>
</template>
