// stores/authStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { API } from '@/plugins/api';

export const useAuthStore = defineStore('auth', () => {
  let token  = ref(localStorage.getItem('token'));
  const isUserAuthenticated = ref(false);
  const expireTime: string = getExpireTime();

  function getExpireTime(): string {
    if (token.value){
      const payload = JSON.parse(atob(token.value.split('.')[1]));
      const timestamp = payload.exp;
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    }
    else return "Kein Token";
  }

  function isTokenExpired(): boolean {
    if (token.value === null) return true;
    try {
      const payload = JSON.parse(atob(token.value.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch (e) {
      return true; // Falls Token nicht lesbar ist, als abgelaufen behandeln
    }
  }

  async function login(email: string, password: string) {
    if (token.value === "" || token.value === null || isTokenExpired()){

      try {
          const loginData = {
                email: email,
                password: password
          }
          const response = await API.postRequest("/login", loginData);

        // Beispiel: Server gibt ein JWT zurück
        token.value = response.access_token;

        // Token speichern (vorsichtig sein mit XSS)
        if (token.value) localStorage.setItem('token', token.value);
        isUserAuthenticated.value = true;
        return true;
      } catch (error) {
        console.error("Login fehlgeschlagen:", error)
        return false;
      }
    }else alert("Sie sind schon Eingeloggt!");
  }

  function logOut(){
    localStorage.removeItem("token");
    token.value = null;
    isUserAuthenticated.value  = false;
  }

  return {
    login, logOut, isTokenExpired,
    isUserAuthenticated, token, expireTime
  }
})
