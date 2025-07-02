import { computed, ref } from 'vue'
import type { Auction } from '@/types/auction'

const DEFAULT_AUCTION_URL = '/datas/auction.json'

export function useAuction(apiUrl = DEFAULT_AUCTION_URL) {
  const auction = ref<Auction>()
  const bidders = computed(() => auction.value?.bidders)
  const product = computed(() => auction.value?.product)
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  async function getAuction() {
    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      auction.value = data
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message ? err.message : 'Unknown error occurred'
        throw new Error(error.value)
      }
    } finally {
      isLoading.value = false
    }
  }

  return { auction, isLoading, error, getAuction, bidders, product }
}
