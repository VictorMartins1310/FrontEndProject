<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { computed, type ComputedRef, ref, watch } from 'vue'
import PaypalSpenden from './components/PaypalSpenden.vue'
import DashBoard from './views/DashBoard.vue'
import LoginForm from './components/LoginForm.vue'

const auth = useAuthStore()

const route = useRoute()

Notification.requestPermission().then((permission) => {
  console.log('Permission: ' + permission)
  if (permission === 'granted') {
    console.log('Benachrichtigungen erlaubt')
  }
})

function sendNotification() {
  new Notification('Titel der Nachricht', {
    body: 'Dies ist der Nachrichtentext',
    icon: '/pfad/zum/icon.png', // optional
  })
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/register" v-show="!auth.isUserAuthenticated">Register</RouterLink>
      </nav>
    </div>
  </header>
  <DashBoard v-show="auth.isUserAuthenticated" />
  <LoginForm v-if="!auth.isUserAuthenticated && route.path != '/register'" />
  <RouterView v-else />
  <button v-if="auth.isUserAuthenticated" v-on:click="auth.logOut()">Log me Out</button>
  <PaypalSpenden />
  <button v-on:click="sendNotification()">Notification</button>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    max-width: 5%;
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
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
