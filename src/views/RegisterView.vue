<script setup lang="ts">

import { ref } from 'vue'

async function register(){
  const data = {
    email : email.value,
    password : password.value,
  }
  const response = await fetch("http://localhost:8710/api/users/register", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    return response.json();
}

const password = ref("");
const email = ref("");

async function generatePW() {
  const proxy: string = 'https://corsproxy.io/';
  const server: string = 'https://passwordwolf.com/api/';
  const link: string = proxy + server + "?repeat=1&length=8&special=off";
  const data = await fetch(link)
  const response = await data.json();
  password.value = response[0].password;
  vTypePW.value = "Text";
  return response;
}

const vTypePW = ref("password");

</script>

<template>
  <form v-on:submit.prevent="register()">
    <input v-model="email" type="text" placeholder="E-mail" />
    <input v-model="password" v-bind:type="vTypePW" placeholder="Password" />
    <input type="button" v-on:click="generatePW" value="Generate PW" />
    <input type="password" placeholder="Confirm Password" />
    <input type="submit" value="Register" />
  </form>
</template>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 10px;
  }
</style>
