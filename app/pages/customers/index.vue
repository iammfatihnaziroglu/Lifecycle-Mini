<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CustomerTable from '~/components/customers/CustomerTable.vue'
import ScoreBadge from '~/components/ScoreBadge.vue'

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

const customers = ref<Customer[]>([])
const loading = ref(false)
const error = ref('')

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
    // Fallback olarak boş liste kullan
    customers.value = []
  } finally {
    loading.value = false
  }
}

// Sayfa yüklendiğinde API'den veri yükle
onMounted(() => {
  loadCustomers()
})


const tableColumns = computed(() => [
  {
    key: 'name',
    label: 'İsim'
  },
  {
    key: 'email',
    label: 'E-mail'
  },
  {
    key: 'phone',
    label: 'Telefon',
    formatter: (value: unknown) => formatPhone(value as string)
  },
  {
    key: 'budget',
    label: 'Bütçe',
    formatter: (value: unknown) => formatCurrency(value as number)
  },
  {
    key: 'roomPreference',
    label: 'Oda Tercihi',
    formatter: (value: unknown) => `${value as number} oda`
  },
  {
    key: 'score',
    label: 'Skor',
    component: ScoreBadge,
    componentProps: (row: Record<string, unknown>) => ({ score: (row as unknown as Customer).score })
  }
])


function formatCurrency(amount: number) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Telefon formatı
function formatPhone(phone: string) {
  // Eğer zaten 0 ile başlıyorsa olduğu gibi döndür
  if (phone.startsWith('0')) {
    return phone
  }
  // Değilse başına 0 ekle
  return `0 ${phone}`
}

async function addNewCustomer(customerData: {
  name: string
  email: string
  phone: number
  countryCode: string
  budget: number
  roomPreference: number
}) {
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
  } catch (error) {
    console.error('Error adding customer:', error)
    throw error
  }
}

// Global olarak erişilebilir yap
if (import.meta.client) {
  (window as unknown as Record<string, unknown>).addNewCustomer = addNewCustomer
}
</script>

<template>
  <div class="space-y-6">
    <!-- Sayfa Başlığı -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Müşteriler</h1>
        <p class="mt-1 text-sm text-gray-600">
          Müşteri bilgilerini görüntüleyin ve yeni müşteri ekleyin
        </p>
      </div>
      
      <!-- Yeni Müşteri Ekleme Butonu -->
      <button
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        @click="navigateTo('/customers/newcustomers')"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        Yeni Müşteri
      </button>
    </div>

    <!-- Müşteri Tablosu -->
    <CustomerTable 
      :columns="tableColumns"
      :data="customers"
      :loading="loading"
      empty-message="Henüz müşteri yok"
      empty-description="İlk müşterinizi ekleyerek başlayın."
    />

    <!-- Hata mesajı -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <div class="flex">
        <svg class="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <div>
          <h3 class="text-sm font-medium text-red-800">Hata</h3>
          <p class="text-sm text-red-700 mt-1">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
