<script setup lang="ts">
import { onMounted } from 'vue'
import { useBidders } from '../composables/useBidders'

const { bidders, isLoading, error, getBidders } = useBidders()

onMounted(() => {
  getBidders()
})
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else-if="bidders.length === 0">No bidders found</div>
    <div v-else>
      <h1 class="text-8xl text-red-500">Bidders List</h1>
      <ul>
        <li v-for="bidder in bidders" :key="bidder.name">
          {{ bidder.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
