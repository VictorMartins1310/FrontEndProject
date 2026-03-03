<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { computed, ref } from 'vue';

const auth = useAuthStore();

const email = ref(""), password = ref("");

const showPassword = ref(false);
const inputType = computed(() => {
  if (showPassword.value) return "text";
  return "password";
})

if (import.meta.env.DEV) {
  email.value = "Victor.Martins.1310@hotmail.com";
  password.value = "badPassword";
}


</script>

<template>
    <!-- <div class="overlay"> -->
      <form v-show="!auth.isUserAuthenticated" class="login-box" v-on:submit.prevent="auth.login(email, password)">
        <h2>Login</h2>
        <input name="email" v-model="email" type="text" placeholder="Benutzername" required autocomplete="off" />
        <div class="password-wrapper">
          <input name="password" class="password-input" v-model="password" v-bind:type="inputType" placeholder="Passwort" required>
          <input name="pwvisibility" class="toggle-checkbox" v-model="showPassword" type="checkbox" :title="showPassword ? 'Verbergen' : 'Anzeigen'" />
        </div>
        <button type="submit">Einloggen</button>
        <!-- <a v-on:click="switchForm()" v-if="!auth.isUserAuthenticated">Register</a> -->
      </form>
  <!-- </div> -->
</template>

<style scoped>

.password-wrapper {
  position: relative;
  width: 100%;
}

.password-input {
  width: 100%;
  padding-right: 40px; /* Platz für die Checkbox */
  box-sizing: border-box;
}

.toggle-checkbox {
  width: fit-content;
  position: absolute;
  top: 25%;
  right: 20px;
  cursor: pointer;
}




    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      /* width: 100%;
      height: 100%; */
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    form {
      background: #ffffff;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      width: 320px;
      animation: fadeIn 0.5s ease;
    }

    form h2 {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    form input {
      width: 100%;
      padding: 0.75rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
    }

    form button {
      width: 100%;
      padding: 0.75rem;
      background-color: #444;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    form button:hover {
      background-color: #333;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    </style>
