import api from './api'

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/login', { email, password })
    const { token, usuario } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(usuario))
    return usuario
  },

  async logout() {
    await api.post('/logout')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated() {
    return !!localStorage.getItem('token')
  }
}
