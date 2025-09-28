<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import authService from '@/services/auth'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  try {
    await authService.login(email.value, password.value)

    // Si hay redirect en la URL, úsalo
    const redirect = route.query.redirect as string || '/usuarios'
    router.push(redirect)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión'
  }
}
</script>

<template>
  <v-container>
    <h2>Iniciar sesión</h2>

    <v-text-field
      v-model="email"
      label="Correo"
      type="email"
      outlined
      dense
    />
    <v-text-field
      v-model="password"
      label="Contraseña"
      type="password"
      outlined
      dense
    />

    <v-btn color="primary" @click="handleLogin">
      Entrar
    </v-btn>

    <div v-if="error" class="text-red mt-2">{{ error }}</div>
  </v-container>
</template>
