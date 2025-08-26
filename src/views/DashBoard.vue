<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

</script>

<template>
<div>
    Expire Time: {{ useAuthStore().expireTime  }}
</div>
</template>

<style scoped>
</style>