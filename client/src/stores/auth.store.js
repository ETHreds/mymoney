import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../boot/axios' // Ensure axios is installed

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isSubmitting = ref(false)
  const error = ref(null)

  const signUp = async (data) => {
    isSubmitting.value = true
    try {
      const response = await api.post('/auth/sign-up', data)
      user.value = response.data
      error.value = null
    } catch (err) {
      if (err.response && err.response.status === 401) {
        error.value = 'Invalid credentials. Please try again.'
      } else {
        error.value = 'An error occurred. Please try again later.'
      }
    } finally {
      isSubmitting.value = false
    }
  }
  const signIn = async (data) => {
    isSubmitting.value = true
    try {
      const response = await api.post('/auth/sign-in', data)
      user.value = response.data
      error.value = null
    } catch (err) {
      if (err.response && err.response.status === 401) {
        error.value = 'Invalid credentials. Please try again.'
      } else {
        error.value = 'An error occurred. Please try again later.'
      }
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    user,
    isSubmitting,
    error,
    signUp,
    signIn
  }
})
