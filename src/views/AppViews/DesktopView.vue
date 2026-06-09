<script lang="ts" setup>
import SideBar from '@/components/SideBar.vue';
import { ref } from 'vue';

const visibleNewItemForm = ref(false);

/**
 * Sendet eine eine Notification 
 * @param titel 
 * @param body 
 */
function sendNotification(titel: string, body: string) {
  new Notification(titel, {
    body: body,
    icon: '/favicon.ico', // optional
  })
}

function switchItemForm(value: boolean) {
  visibleNewItemForm.value = value;
  console.log(visibleNewItemForm.value);
}
</script>
<template>
    <div class="layout">
        <SideBar v-on:show-new-Item-Form="switchItemForm" />
        <main class="pt-1">
            <RouterView v-bind:showNewItemForm="visibleNewItemForm" v-on:show-new-item-form="switchItemForm" v-on:newNotification="sendNotification" />
        </main>
    </div>
</template>
<style scoped>
.layout {
    display: grid;
    grid-template-columns: auto 1fr;
}

main {
    background-color: #8f8f8f;
}
</style>