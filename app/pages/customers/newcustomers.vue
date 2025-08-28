<script setup lang="ts">
import { ref, reactive } from 'vue'

// Form verileri interface'i
interface CustomerForm {
  name: string
  email: string
  phone: string
  budget: number
  roomPreference: number
}

// Loading durumu
const isSubmitting = ref(false)

// Form verileri
const form = reactive<CustomerForm>({
  name: '',
  email: '',
  phone: '',
  budget: 0,
  roomPreference: 1
})

// Form validasyon
const errors = reactive({
  name: '',
  email: '',
  phone: '',
  budget: ''
})

// Toast mesajı
const toast = ref({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error'
})

// Form validasyon fonksiyonu
function validateForm() {
  // Hataları temizle
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  let isValid = true

  if (!form.name.trim()) {
    errors.name = 'İsim alanı zorunludur'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'E-mail alanı zorunludur'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Geçerli bir e-mail adresi giriniz'
    isValid = false
  }

  if (!form.phone.trim()) {
    errors.phone = 'Telefon alanı zorunludur'
    isValid = false
  }

  if (form.budget <= 0) {
    errors.budget = 'Bütçe 0\'dan büyük olmalıdır'
    isValid = false
  }

  return isValid
}

// Müşteri ekleme fonksiyonu
async function handleAddCustomer() {
  if (!validateForm()) return
  
  isSubmitting.value = true

  try {
    // Simülasyon için 1 saniye bekle
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('Yeni müşteri eklendi:', form)
    
    // Başarı mesajı göster
    showToast('Müşteri başarıyla eklendi!', 'success')

    // Form başarıyla gönderildikten sonra müşteri listesine yönlendir
    setTimeout(() => {
      navigateTo('/customers')
    }, 1500)

  } catch {
    showToast('Müşteri eklenirken bir hata oluştu!', 'error')
  } finally {
    isSubmitting.value = false
  }
}

// Toast gösterme fonksiyonu
function showToast(message: string, type: 'success' | 'error') {
  toast.value = {
    show: true,
    message,
    type
  }

  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

// Geri gitme fonksiyonu
function goBack() {
  navigateTo('/customers')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Sayfa Başlığı -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Yeni Müşteri Ekle</h1>
        <p class="mt-1 text-sm text-gray-600">
          Aşağıdaki formu doldurarak yeni bir müşteri ekleyebilirsiniz
        </p>
      </div>
      
      <!-- Geri Dönme Butonu -->
      <button
        class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        @click="goBack"
      >
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Geri Dön
      </button>
    </div>

    <!-- Form Container -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-6">
        <form class="space-y-6" @submit.prevent="handleAddCustomer">
          <!-- Form Grid Layout -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- İsim -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                İsim <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                :class="[
                  'block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors',
                  errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                ]"
                placeholder="Müşteri adını giriniz"
              >
              <p v-if="errors.name" class="mt-2 text-sm text-red-600">{{ errors.name }}</p>
            </div>

            <!-- E-mail -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                E-mail <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                :class="[
                  'block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors',
                  errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                ]"
                placeholder="ornek@email.com"
              >
              <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
            </div>

            <!-- Telefon -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                Telefon <span class="text-red-500">*</span>
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                :class="[
                  'block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors',
                  errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                ]"
                placeholder="+90 5XX XXX XX XX"
              >
              <p v-if="errors.phone" class="mt-2 text-sm text-red-600">{{ errors.phone }}</p>
            </div>

            <!-- Bütçe -->
            <div>
              <label for="budget" class="block text-sm font-medium text-gray-700 mb-2">
                Bütçe (TL) <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">₺</span>
                </div>
                <input
                  id="budget"
                  v-model.number="form.budget"
                  type="number"
                  min="0"
                  step="1000"
                  :class="[
                    'block w-full pl-7 pr-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors',
                    errors.budget ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                  ]"
                  placeholder="500,000"
                >
              </div>
              <p v-if="errors.budget" class="mt-2 text-sm text-red-600">{{ errors.budget }}</p>
            </div>
          </div>

          <!-- Oda Sayısı - Full width -->
          <div>
            <label for="roomPreference" class="block text-sm font-medium text-gray-700 mb-2">
              Oda Tercihi
            </label>
            <select
              id="roomPreference"
              v-model.number="form.roomPreference"
              class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            >
              <option value="1">1 oda</option>
              <option value="2">2 oda</option>
              <option value="3">3 oda</option>
              <option value="4">4 oda</option>
              <option value="5">5+ oda</option>
            </select>
          </div>
        </form>
      </div>
      
      <!-- Form Actions - Separate section -->
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            :disabled="isSubmitting"
            class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            @click="goBack"
          >
            İptal
          </button>
          
          <button
            :disabled="isSubmitting"
            type="submit"
            class="px-6 py-2 bg-blue-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center transition-colors"
            @click="handleAddCustomer"
          >
            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {{ isSubmitting ? 'Ekleniyor...' : 'Müşteri Ekle' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Bildirim -->
    <div
      v-if="toast.show"
      :class="[
        'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 max-w-md',
        toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      ]"
    >
      <div class="flex items-center">
        <svg 
          v-if="toast.type === 'success'"
          class="w-5 h-5 mr-3 flex-shrink-0" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        <svg 
          v-else
          class="w-5 h-5 mr-3 flex-shrink-0" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
        <span class="text-sm font-medium">{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>
