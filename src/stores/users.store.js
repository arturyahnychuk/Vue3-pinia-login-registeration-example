import { defineStore } from 'pinia'

import { fetchWrapper } from '@/helpers'

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
    }
  }
})
