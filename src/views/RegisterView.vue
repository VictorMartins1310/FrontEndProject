<script setup lang="ts">

import { ref } from 'vue'
import { useRouter }  from 'vue-router';

const router = useRouter();
const formData = ref({
  email: "",
  password: "badPassword"
} );


async function registerOld(){
  const BodyData = {
    method: 'POST',
    body: JSON.stringify(formData.value),
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const response = await fetch( import.meta.env.VITE_HOMELINK +"/users/register", BodyData);
  return await response.json();
}

async function registerOnSupabe(){
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY
    },
    body: JSON.stringify(formData.value)
  });
  return await response.json();
}

async function register(){
  let data;
  // data = await registerOnSupabe();
  // console.log(data);
  data = await registerOld();
  console.log(data);
  registered.value = true;
 setTimeout(() => { router.push('/') }, 3000);
}

async function generatePW() {
  const proxy: string = 'https://corsproxy.io/';
  const server: string = 'https://passwordwolf.com/api/';
  const link: string = proxy + server + "?repeat=1&length=8&special=off";
  const data = await fetch(link);
  const response = await data.json();
  formData.value.password = response[0].password;
  vTypePW.value = "Text";
  return response;
}

const vTypePW = ref("password");
const registered = ref(false);

</script>

<template>
  <form v-on:submit.prevent="register()">
    <input v-model="formData.email" type="text" placeholder="E-mail" />
    <input v-model="formData.password" v-bind:type="vTypePW" placeholder="Password" />
    <input type="button" v-on:click="generatePW" value="Generate PW" />
    <input type="password" placeholder="Confirm Password" />
    <input type="submit" value="Register" />
  </form>
  <h1 v-show="registered" style="background-color: white; border: 1px solid black; border-radius: 6px; padding: 8px;  position: absolute; top: 50%; left: 50%">Done! You would be redirected</h1>
</template>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 10px;
  }
  input {
    padding: 8px;
    font-size: 1.1em;
  }
</style>
