import { ref } from 'vue'
import type { Bidder } from '../utils/vickrey-auction'

export function useBidders() {
  const bidders = ref<Bidder[]>([])
  const isLoading = ref(true)
  const error = ref(null)

  async function getBidders() {
    try {
      const response = await fetch('/datas/bidders.json')
      const data = await response.json()
      bidders.value = data
    } catch (error: unknown) {
      if (error instanceof Error) {
        error.message = `Impossible to fetch bidders: ${error.message}`
        throw error
      }
    } finally {
      isLoading.value = false
    }
  }

  return { bidders, isLoading, error, getBidders }
}
