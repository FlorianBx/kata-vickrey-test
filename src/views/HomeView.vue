<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuction } from '@/composables/useAuction'
import { vickreyAuction } from '@/utils/vickrey-auction'

const showWinner = ref(false)
const { product, bidders, isLoading, error, getAuction } = useAuction()

const auctionWinner = computed(() => {
  if (!bidders.value || !product.value) return null
  return vickreyAuction(bidders.value, product.value.reservePrice)
})

const statusClass = computed(() => ({
  'bg-red-600': product.value?.state === 'Closed',
  'bg-green-400': product.value?.state === 'In progress',
}))

function handleShowWinner() {
  showWinner.value = !showWinner.value
}

onMounted(() => {
  getAuction()
})
</script>

<template>
  <div class="space-y-8">
    <div v-if="isLoading" class="flex items-center justify-center py-16">
      <div class="text-lg text-slate-600">Loading auction...</div>
    </div>

    <div v-else-if="error" class="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
      <p class="text-red-800">{{ error }}</p>
    </div>

    <div v-else-if="product" class="space-y-8">
      <article class="overflow-hidden rounded border border-slate-100 bg-white shadow-sm">
        <div class="grid grid-cols-1 gap-0 lg:grid-cols-2">
          <div class="relative aspect-[4/3] lg:aspect-auto">
            <img
              class="h-full w-full object-cover"
              :src="product.image"
              :alt="product.imageAlt || ''"
              width="600"
              height="450"
              fetchpriority="high"
            />
            <div class="absolute top-4 right-4">
              <span
                :class="statusClass"
                class="rounded px-3 py-1.5 text-sm font-medium text-white shadow-lg backdrop-blur-sm"
              >
                {{ product.state }}
              </span>
            </div>
          </div>

          <div class="flex flex-col justify-between p-6 sm:p-8 lg:p-12">
            <div class="space-y-6">
              <div>
                <h2
                  class="text-2xl leading-tight font-light text-slate-900 sm:text-3xl lg:text-4xl"
                >
                  {{ product.name }}
                </h2>
              </div>

              <p class="text-base leading-relaxed text-slate-600 sm:text-lg">
                {{ product.description }}
              </p>
            </div>

            <div class="mt-8 border-t border-slate-100 pt-6">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm font-medium tracking-wide text-slate-500 uppercase">
                    Reserve Price
                  </p>
                  <p class="text-2xl font-light text-slate-900 sm:text-3xl">
                    {{ product.reservePrice }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div class="flex justify-center">
        <button
          @click="handleShowWinner"
          class="rounded bg-slate-900 px-8 py-3 font-medium text-white shadow-sm transition-colors duration-200 hover:bg-slate-800 hover:shadow-md"
        >
          {{ showWinner ? 'Hide Results' : 'Show Winner' }}
        </button>
      </div>

      <section
        v-if="showWinner && auctionWinner"
        class="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
      >
        <div
          class="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4"
        >
          <h3 class="text-lg font-medium text-slate-900">Auction Results</h3>
        </div>

        <div class="p-6 sm:p-8">
          <template v-if="auctionWinner.winner">
            <div class="space-y-4 text-center">
              <div
                class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
              >
                <svg
                  class="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>

              <div>
                <p class="mb-2 text-sm font-medium tracking-wide text-slate-500 uppercase">
                  Winner
                </p>
                <p class="mb-4 text-3xl font-light text-slate-900">{{ auctionWinner.winner }}</p>
              </div>

              <div class="border-t border-slate-100 pt-4">
                <p class="mb-2 text-sm font-medium tracking-wide text-slate-500 uppercase">
                  Final Price
                </p>
                <p class="text-2xl font-light text-slate-900">{{ auctionWinner.winningPrice }} €</p>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="space-y-4 text-center">
              <div
                class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100"
              >
                <svg
                  class="h-8 w-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <p class="text-xl font-light text-slate-600">No valid bids received</p>
              <p class="text-sm text-slate-500">Reserve price was not met</p>
            </div>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>
