<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { useAuthStore } from './stores/auth';
import LoginForm from './components/LoginForm.vue';
import { computed, ref } from 'vue';
import SideBar from './components/SideBar.vue';

const auth = useAuthStore();
const route = useRoute();

Notification.requestPermission().then((permission) => {
  console.log('Permission: ' + permission)
  if (permission === 'granted') {
    console.log('Benachrichtigungen erlaubt')
  }
})

function sendNotification(titel: string, body: string) {
  new Notification(titel, {
    body: body,
    icon: '/favicon.ico', // optional
  })
}

const showLoginOptions = computed(() => {
  return route.path != '/register' && route.path != '/about';
})

const visibleNewItemForm = ref(false);

function switchItemForm(value: boolean) {
  visibleNewItemForm.value = value;
  console.log(visibleNewItemForm.value);
}
</script>
<template>
  <LoginForm v-if="!auth.isUserAuthenticated && showLoginOptions " />
  <main v-else>
    <SideBar v-on:show-new-Item-Form="switchItemForm" />
    <RouterView v-bind:showNewItemForm="visibleNewItemForm" v-on:show-new-item-form="switchItemForm" v-on:newNotification="sendNotification" />
  </main>
</template>

<style scoped>
main {
  /* max-width: 100vw; */
  min-height: 100vwh;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  min-width: 96vw;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  top: 2px;
  left: 2px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  border-left: 1px solid var(--color-border);
  height: fit-content;
  padding: 10px;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;
  }
}
</style>
