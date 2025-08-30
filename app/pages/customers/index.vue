<script setup lang="ts">
import { ref, computed } from 'vue'
import CustomerTable from '~/components/customers/CustomerTable.vue'
import ScoreBadge from '~/components/ScoreBadge.vue'

// Müşteri tipini tanımla
interface Customer {
  id: number
  name: string
  email: string
  phone: string
  countryCode: string
  budget: number
  roomPreference: number
  score: 'Low' | 'Medium' | 'High'
}



// Varsayılan müşteri listesi
const defaultCustomers: Customer[] = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '532 123 4567',
    countryCode: 'TR',
    budget: 500000,
    roomPreference: 3,
    score: 'High'
  },
  {
    id: 2,
    name: 'Fatma Demir',
    email: 'fatma@example.com',
    phone: '533 987 6543',
    countryCode: 'TR',
    budget: 300000,
    roomPreference: 2,
    score: 'Medium'
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    email: 'mehmet@example.com',
    phone: '534 555 1234',
    countryCode: 'TR',
    budget: 750000,
    roomPreference: 4,
    score: 'Low'
  }
]

// Müşteri listesi - localStorage'dan yükle veya varsayılan kullan
const customers = ref<Customer[]>(defaultCustomers)

// Sayfa yüklendiğinde localStorage'dan veri yükle
if (import.meta.client) {
  const saved = localStorage.getItem('customers')
  if (saved) {
    customers.value = JSON.parse(saved)
  }
}



// Tablo sütunları tanımı
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
    label: 'Telefon'
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



// Para formatı
function formatCurrency(amount: number) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Skor hesaplama fonksiyonu
function calculateScore(budget: number): 'Low' | 'Medium' | 'High' {
  if (budget >= 500000) return 'High'
  if (budget >= 300000) return 'Medium'
  return 'Low'
}

// Yeni müşteri ekleme fonksiyonu - global olarak erişilebilir
function addNewCustomer(customerData: {
  name: string
  email: string
  phone: string
  countryCode: string
  budget: number
  roomPreference: number
}) {
  const newCustomer: Customer = {
    id: Date.now(),
    ...customerData,
    score: calculateScore(customerData.budget)
  }
  
  customers.value.push(newCustomer)
  
  // localStorage'a kaydet
  if (import.meta.client) {
    localStorage.setItem('customers', JSON.stringify(customers.value))
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
      empty-message="Henüz müşteri yok"
      empty-description="İlk müşterinizi ekleyerek başlayın."
    />


  </div>
</template>
