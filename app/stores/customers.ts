import { defineStore } from 'pinia'

interface Customer {
  id: number
  name: string
  email: string
  phone: number
  countryCode: string
  budget: number
  roomPreference: number
  score: 'Low' | 'Medium' | 'High'
}

export const useCustomersStore = defineStore('customers', () => {
  // State
  const customers = ref<Customer[]>([])
  const loading = ref(false)
  const error = ref('')

  // Actions
  async function loadCustomers() {
    loading.value = true
    error.value = ''
    
    try {
      const response = await fetch('http://localhost:3001/api/customers')
      if (!response.ok) {
        throw new Error('Müşteriler yüklenirken hata oluştu')
      }
      customers.value = await response.json()
    } catch (err) {
      console.error('Error loading customers:', err)
      error.value = 'Müşteriler yüklenirken hata oluştu'
      customers.value = []
    } finally {
      loading.value = false
    }
  }

  async function addCustomer(customerData: {
    name: string
    email: string
    phone: number
    countryCode: string
    budget: number
    roomPreference: number
  }) {
    loading.value = true
    error.value = ''
    
    try {
      const response = await fetch('http://localhost:3001/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Müşteri eklenirken hata oluştu')
      }

      const newCustomer = await response.json()
      customers.value.push(newCustomer)
      
      return newCustomer
    } catch (err) {
      console.error('Error adding customer:', err)
      error.value = err instanceof Error ? err.message : 'Müşteri eklenirken hata oluştu'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Error'u temizle
  function clearError() {
    error.value = ''
  }

  return {
    // State
    customers,
    loading,
    error,
    
    // Actions
    loadCustomers,
    addCustomer,
    clearError
  }
})
