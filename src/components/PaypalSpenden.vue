<script setup lang="ts">
const openPaypal = () => {
  const url = `https://www.paypal.com/donate/?business=${encodeURIComponent(import.meta.env.VITE_PRIVATE_MAIL)}&currency_code=EUR`
  window.open(url, "_blank")
}
</script>

<template>
  <div class="donate-container">
    <button v-on:click="openPaypal" class="donate-button">
      💖 Jetzt spenden via PayPal
    </button>
  </div>
</template>


<style scoped>
.donate-container {
  text-align: center;
  margin-top: 2rem;
}

.donate-button {
  background-color: #0070ba;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.donate-button:hover {
  background-color: #005c99;
}
</style>
