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
  if (import.meta.env.MODE === 'development')
    console.log("Computed\nToken:", token.value, "Is Token Expired?", isTokenExpired.value );
    return (token.value && !isTokenExpired.value);
  })

  const loginData: { email: string; password: string } = { email: '', password: '' };


  async function loginOnSupaBse(email: string, password: string) {
    loginData.email = email;
    loginData.password = password;
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const jsonResponse = await response.json();

    if (!response.ok) {
      throw new Error(jsonResponse.error_description || jsonResponse.error || "Login fehlgeschlagen");
    }
    return jsonResponse;
  }

  /**
   * Attempt to login in at DB (SupaBase)
   * @param email 
   * @param password 
   * @returns isUserAuthenticated = true or false
   */
  async function login(email: string, password: string){
    let bearerToken = "";
    const atemptSupabase = await loginOnSupaBse(email, password);
    bearerToken = atemptSupabase.access_token;
    setToken(bearerToken);

    return isUserAuthenticated.value;
  }

  function logOut(){
    removeToken();
  }

  return {
    login, logOut,
    isUserAuthenticated, token, expireTime
  }
})
