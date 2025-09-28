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

    // Si existe redirect en la URL (ej: /login?redirect=/usuarios) lo usamos
    const redirect = (route.query.redirect as string) || '/usuarios'
    router.push(redirect)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión'
  }
}
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center" style="height: 100vh;">
    <v-card class="pa-6" max-width="400">
      <h2 class="text-h5 mb-4 text-center">Iniciar sesión</h2>

      <v-text-field
        v-model="email"
        label="Correo electrónico"
        type="email"
        variant="outlined"
        density="comfortable"
        class="mb-3"
      />

      <v-text-field
        v-model="password"
        label="Contraseña"
        type="password"
        variant="outlined"
        density="comfortable"
        class="mb-4"
      />

      <v-btn color="primary" block @click="handleLogin">
        Entrar
      </v-btn>

      <v-alert
        v-if="error"
        type="error"
        variant="tonal"
        class="mt-4"
        border="start"
      >
        {{ error }}
      </v-alert>
    </v-card>
  </v-container>
</template>
