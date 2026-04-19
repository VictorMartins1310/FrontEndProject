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
  return route.path != '/register';
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
  min-height: calc(100vwh-2rem);
  display: flex;
}
</style>
