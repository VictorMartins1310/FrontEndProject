<script setup lang="ts">

async function register(){
    alert("To be develop");
    return null;
}
</script>

<template>
    <form v-on:submit.prevent="register()">
        <input type="text" placeholder="E-mail" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="Register" />
    </form>
</template>