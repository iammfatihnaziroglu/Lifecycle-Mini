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
  budget: number
  roomPreference: number
  score: 'Low' | 'Medium' | 'High'
}



// Müşteri listesi
const customers = ref<Customer[]>([
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 532 123 4567',
    budget: 500000,
    roomPreference: 3,
    score: 'High'
  },
  {
    id: 2,
    name: 'Fatma Demir',
    email: 'fatma@example.com',
    phone: '+90 533 987 6543',
    budget: 300000,
    roomPreference: 2,
    score: 'Medium'
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    email: 'mehmet@example.com',
    phone: '+90 534 555 1234',
    budget: 750000,
    roomPreference: 4,
    score: 'Low'
  }
])



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
    formatter: (value: number) => formatCurrency(value)
  },
  {
    key: 'roomPreference',
    label: 'Oda Tercihi',
    formatter: (value: number) => `${value} oda`
  },
  {
    key: 'score',
    label: 'Skor',
    component: ScoreBadge,
    componentProps: (row: Customer) => ({ score: row.score })
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
