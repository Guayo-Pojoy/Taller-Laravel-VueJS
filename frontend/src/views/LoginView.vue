<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authService } from '@/services/auth'  //se usa el servicio en vez de api directo

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const loading = ref(false)
const valid = ref(false)
const errorMsg = ref('')

const rules = {
  required: (v: string) => !!v || 'Requerido',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Email inválido',
  min6: (v: string) => (v?.length ?? 0) >= 6 || 'Mínimo 6 caracteres',
}

const onSubmit = async () => {
  errorMsg.value = ''
  loading.value = true
  try {
    const data = await authService.login(email.value, password.value)

    // Guardar usuario
    localStorage.setItem('user', JSON.stringify(data.usuario))

    // Redirigir (ej: /usuarios)
    const redirect = (route.query.redirect as string) || '/usuarios'
    router.push(redirect)
  } catch (e: any) {
    errorMsg.value = e?.response?.data?.message
      || e?.response?.data?.errors?.email?.[0]
      || 'No se pudo iniciar sesión. Verifica tus credenciales.'
  } finally {
    loading.value = false
  }
}
</script>
