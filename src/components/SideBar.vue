<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';

const auth = useAuthStore();
defineEmits(['showNewItemForm']);
</script>
<template>
  <aside class="wrapper">
    <div class="SideBar">
      <!-- <p>Expire Time: {{ auth.expireTime  }}</p> -->
      <button style="padding: 12px;" v-on:click="$emit('showNewItemForm', true)">Add  ➕</button>
      <button>
        <RouterLink to="">My Account</RouterLink>
      </button>
      <button v-if="auth.isUserAuthenticated" v-on:click="auth.logOut()">Log me Out</button>
    </div>
    </aside>
</template>
<style scoped>
.wrapper {
  display: flex;
  align-items: center; /* Reminder: This set item in the middle */
  position: sticky;
  min-height: calc(100vh - 2rem); /* Reminder: 2 rem because #App padding have 1rem */
  padding: 1rem 2rem;
}

.SideBar {
  position: flex;
  background-color: #2c2c2c;
  color: white;
  border-radius: 1rem;
  max-height: fit-content;
  padding: 1rem;
  max-width: 22ch;
}

button {
  width: 100%;
  background-color: #2c2c2c;
  border: 0px;
  border-radius: 0.75rem;
  color: white;
  font-weight: bold;
}

button:hover{
  background-color: aliceblue;
  color: black;
}
</style>
