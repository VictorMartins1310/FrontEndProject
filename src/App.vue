<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAuthStore } from './stores/auth';
import LoginForm from './components/LoginForm.vue';
import { computed, ref, onMounted, onUnmounted, type Ref } from 'vue';
import DesktopView from './views/AppViews/DesktopView.vue';
import PhoneView from './views/AppViews/PhoneView.vue';
import TabletView from './views/AppViews/TabletView.vue';

const 
  auth = useAuthStore(),
  route = useRoute(),
  
  breite = ref(window.innerWidth),
  isDesktop = ref(false),
  isPhone = ref(false),
  isTablet = ref(false),
  appTitle = ref(getElementByID('appTitle')),

  showLoginOptions = computed(() => {
    return route.path != '/register';
  })

function getElementByID(elementID: string): HTMLElement {
  return document.getElementById(elementID)!;
}

function setViewMode(){
  breite.value = window.innerWidth;
  isDesktop.value = false;
  isTablet.value = false;
  isPhone.value = false;
  if (breite.value > 991) isDesktop.value = true;
  else if (breite.value < 768) isPhone.value = true;
  else isTablet.value = true;
  console.log('Breite: ' + breite.value + 'px, isDesktop: ' + isDesktop.value +', isTablet: ' + isTablet.value + ', isPhone: ' + isPhone.value);
}

Notification.requestPermission().then((permission) => {
  console.log('Permission: ' + permission)
  if (permission === 'granted') {
    console.log('Benachrichtigungen erlaubt')
  }
})

onMounted(() => {
  console.log("App Title: ", appTitle.value.innerText);
  appTitle.value.innerText = "TODO APP 0.1";
  setViewMode();
  window.addEventListener('resize', setViewMode);
})

onUnmounted(() => {
  window.removeEventListener('resize', setViewMode);
})
</script>
<template>
  <LoginForm v-if="!auth.isUserAuthenticated && showLoginOptions " />
  <div v-else>
    <DesktopView v-if="isDesktop" />
    <PhoneView v-else-if="isPhone" />
    <TabletView v-else />
  </div>
</template>