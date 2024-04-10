import { defineStore } from 'pinia'

import { fetchWrapper } from '@/helpers'
import { useAlertStore } from './alert.store'
import { useAuthStore } from './auth.store'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: {},
    user: {}
  }),
  actions: {
    async register(user) {
      await fetchWrapper.post(`${baseUrl}/register`, user)
    },
    async getAll() {
      this.users = { loading: true }
      try {
        this.users = await fetchWrapper.get(baseUrl)
      } catch (error) {
        this.users = { errors }
      }
    },
    async getById(id) {
      this.user = { loading: true }
      try {
        this.user = await fetchWrapper.get(`${baseUrl}/${id}`)
      } catch (error) {
        this.user = { error }
      }
    },
    async update(id, params) {
      await fetchWrapper.put(`${baseUrl}/${id}`, params)

      // update stored user if the logged in user updated their own record
      const authStore = useAuthStore()
      if (id === authStore.user.id) {
        // update local storage
        const user = { ...authStore.user, ...params }
        localStorage.setItem('user', JSON.stringify(user))

        // update auth user in pinia state
        authStore.user = user
      }
    }
  }
})
