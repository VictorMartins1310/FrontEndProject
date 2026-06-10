<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';

const auth = useAuthStore();
defineEmits(['showNewItemForm']);
  /** 
   * Haves a space at the beginning and the end to make it easier to concatenate with other classes
   */
  const navItemStyle: string =  " nav-link nav-item "; 
</script>
<template>
  <!-- <aside class="wrapper">
    <div class="SideBar">
      <p>Expire Time: {{ auth.expireTime  }}</p>
      <i class="bi bi-plus-circle"></i><button style="padding: 12px;" v-on:click="$emit('showNewItemForm', true)">Add  ➕</button>
      <button>
        <i class="bi bi-person-circle"></i><RouterLink to="">My Account</RouterLink>
      </button>
      <i class="bi bi-box-arrow-left"></i><button v-if="auth.isUserAuthenticated" v-on:click="auth.logOut()">Log me Out</button>
    </div>
  </aside> -->
  <aside class="SideBar border-end flex-column">
    <nav class="navbar-brand border-bottom text-white">
      <div class="nav-item">
        <i class="bi bi-house-door"></i>
        <span class="d-none d-sm-inline ms-2">Todo App 0.1</span>
      </div>
    </nav>
    <nav style="height: fit-content;">
      <RouterLink to="/" :class="navItemStyle">
        <i class="bi bi-clipboard-check"></i>
        <span class="d-none d-sm-inline ms-2">To-Do Liste</span>
      </RouterLink>
      <RouterLink to="/add" :class="navItemStyle" v-on:click="$emit('showNewItemForm', true)">
        <i class="bi bi-plus"></i>
        <span class="d-none d-sm-inline ms-2">Add</span>
      </RouterLink>
      <RouterLink to="/" :class="navItemStyle">
        <i class="bi bi-clipboard-check"></i>
        <span class="d-none d-sm-inline ms-2">List</span>
      </RouterLink>
      <RouterLink to="/account" :class="navItemStyle">
        <i class="bi bi-person-circle"></i>
        <span class="d-none d-sm-inline ms-2">My Account</span>
      </RouterLink>
    </nav>
    <nav class="sticky-bottom border-top">
      <RouterLink to="" :class="navItemStyle" v-if="auth.isUserAuthenticated" v-on:click="auth.logOut()">
        <i class="bi bi-box-arrow-left"></i>
        <span class="d-none d-sm-inline ms-2">Log me Out</span>
      </RouterLink>
    </nav>
  </aside>
</template>
<style scoped>
.wrapper {
  display: flex;
  /*align-items: center; /* Reminder: This set item in the middle */
  position: sticky;
  min-height: calc(100vh - 2rem); /* Reminder: 2 rem because #App padding have 1rem */
  /* padding: 1rem 2rem; */
}

.SideBar {
  display: flex;
  background-color: #2c2c2c;
  color: white;
  width: fit-content;
  max-width: 22ch;
  min-height: 100vh;
  height: 100%;
  font-weight: bold;
  padding: 1rem;
  gap: 1rem;
}

nav {
  font-size: 1.5rem;
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
a {
  padding: 0.5rem 1rem;
  white-space: nowrap;
}

</style>
