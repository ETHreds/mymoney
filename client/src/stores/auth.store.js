import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../boot/axios' // Ensure axios is installed

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isSubmitting = ref(false)
  const error = ref(null)

  const signUp = async (data) => {
    isSubmitting.value = true
    try {
      console.log('Sending sign-up request...')
      const response = await api.post('/auth/sign-up', data)
      console.log('Response received:', response)
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
      console.log('Sending sign-in request...')
      const response = await api.post('/auth/sign-in', data)
      console.log('Response received:', response)
      token.value = response.data.token
      error.value = null
    } catch (err) {
      console.error('Error during sign-in:', err)
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
