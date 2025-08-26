import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDefaultStore = defineStore('default', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const loggedIn : Boolean =  false ;
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment, loggedIn }
})
