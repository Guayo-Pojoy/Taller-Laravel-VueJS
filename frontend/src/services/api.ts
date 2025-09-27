import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
})

// Interceptor para agregar token a las peticiones
api.interceptors.request.use((config: any) => {
  const noAuthEndpoints = ['/login', '/register']

  if (config.url && !noAuthEndpoints.some(endpoint => config.url?.startsWith(endpoint))) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})

// Interceptor para manejar respuestas
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('Token inválido o expirado. Redirigiendo a login...')
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
