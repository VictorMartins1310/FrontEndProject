// stores/authStore.ts
import { defineStore } from 'pinia';
import { computed, ref } from 'vue'
import { API } from '@/plugins/api';

export const useAuthStore = defineStore('auth', () => {

  const token = ref(localStorage.getItem('token'));

  function setToken(value: string) {
    localStorage.setItem('token', value);
    token.value = value;
  }
  function removeToken() {
    localStorage.removeItem('token');
    token.value = null;
  }

  const expireTime = computed(() => {
    if (!token.value) return new Date().toLocaleString();
    const payload = JSON.parse(atob(token.value.split('.')[1]))
    return new Date(payload.exp*1000).toLocaleString();
  })

  const isTokenExpired = computed(() => {
    if (token.value)
      try {
        const payload = JSON.parse(atob(token.value.split('.')[1]))
        const now = Math.floor(Date.now() / 1000);
        const expired: boolean = payload.exp < now;
        if (expired) removeToken();
        return expired;
      } catch (e) {
        return true; // Falls Token nicht lesbar ist, als abgelaufen behandeln
      }
    return false;
  });

  const isUserAuthenticated = computed(() => {
    return (token.value && !isTokenExpired.value);
  })

  async function login(email: string, password: string) {
      try {
        const loginData = {
          email: email,
          password: password,
        }
        const response = await API.postRequest('/login', loginData)
        setToken(response.access_token);
        return isUserAuthenticated.value;
      } catch (error) {
        console.error('Login fehlgeschlagen:', error)
        return false
      }
  }

  function logOut(){
    removeToken();
  }

  return {
    login, logOut,
    isUserAuthenticated, token, expireTime
  }
})
