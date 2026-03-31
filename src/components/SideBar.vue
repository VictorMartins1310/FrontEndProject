<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
defineEmits(['showNewItemForm']);
</script>
<template>
  <div class="SideBar">
    <p>Expire Time: {{ auth.expireTime  }}</p>
    <p><button style="padding: 12px;" v-on:click="$emit('showNewItemForm', true)">Add  ➕</button></p>
    <p v-if="auth.isUserAuthenticated"><RouterLink to="">My Account</RouterLink></p>
    <p><RouterLink to="/about">About</RouterLink></p>
    <button v-if="auth.isUserAuthenticated" v-on:click="auth.logOut()">Log me Out</button>
  </div>
</template>
<style scoped>
.SideBar {
  position: absolute;
  top: 40%;
  bottom: auto;
  left: 0;

  background-color: #2c2c2c;
  color: white;

  max-width: fit-content;
  padding: 10px;
  margin-left: 5px;
}
</style>
