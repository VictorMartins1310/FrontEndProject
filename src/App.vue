<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';
import PaypalSpenden from './components/PaypalSpenden.vue';
import DashBoard from './views/DashBoard.vue';
import LoginForm from './components/LoginForm.vue';

const auth = useAuthStore();

onMounted(() => {

if (auth.token && !auth.isTokenExpired()){
  auth.isUserAuthenticated = true;
  if (auth.isTokenExpired())
    alert("Sitzung Abgelaufen");
 }
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/register" v-if="!auth.isUserAuthenticated">Register</RouterLink>
      </nav>
    </div>
  </header>
  <DashBoard />
  <div v-if="auth.isUserAuthenticated">
    <RouterView />
    <button v-on:click="auth.logOut()">Log me Out</button>
  </div>
  <LoginForm v-else />
  <PaypalSpenden />
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
