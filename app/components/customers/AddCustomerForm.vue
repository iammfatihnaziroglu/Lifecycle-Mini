<script setup lang="ts">
import { reactive, watch } from 'vue'

// Props ve Emits
interface Props {
  show: boolean
  loading?: boolean
}

interface CustomerForm {
  name: string
  email: string
  phone: string
  budget: number
  roomPreference: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  close: []
  submit: [data: CustomerForm]
}>()

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

// Form gönderme
function handleSubmit() {
  if (!validateForm()) return
  
  emit('submit', { ...form })
}

// Modal kapatma
function handleClose() {
  emit('close')
}

// Form temizleme
function resetForm() {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.budget = 0
  form.roomPreference = 1
  
  // Hataları temizle
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
}

// Modal açıldığında formu temizle
watch(() => props.show, (newVal) => {
  if (newVal) {
    resetForm()
  }
})
</script>

<template>
  <!-- Modal Overlay -->
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Background overlay -->
    <div 
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
      @click="handleClose"
    />

    <!-- Modal panel -->
    <div class="relative bg-white rounded-lg shadow-xl max-w-lg w-full max-h-full overflow-y-auto">
      <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Yeni Müşteri Ekle
              </h3>
              
              <form class="space-y-4" @submit.prevent="handleSubmit">
                <!-- İsim -->
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">İsim</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    :class="[
                      'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
                      errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                    ]"
                    placeholder="Müşteri adını giriniz"
                  >
                  <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                </div>

                <!-- E-mail -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    :class="[
                      'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
                      errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                    ]"
                    placeholder="ornek@email.com"
                  >
                  <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                </div>

                <!-- Telefon -->
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700">Telefon</label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    :class="[
                      'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
                      errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                    ]"
                    placeholder="+90 5XX XXX XX XX"
                  >
                  <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
                </div>

                <!-- Bütçe -->
                <div>
                  <label for="budget" class="block text-sm font-medium text-gray-700">Bütçe (TL)</label>
                  <input
                    id="budget"
                    v-model.number="form.budget"
                    type="number"
                    min="0"
                    step="1000"
                    :class="[
                      'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
                      errors.budget ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                    ]"
                    placeholder="500000"
                  >
                  <p v-if="errors.budget" class="mt-1 text-sm text-red-600">{{ errors.budget }}</p>
                </div>

                <!-- Oda Sayısı -->
                <div>
                  <label for="roomPreference" class="block text-sm font-medium text-gray-700">Oda Sayısı</label>
                  <select
                    id="roomPreference"
                    v-model.number="form.roomPreference"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
      </div>
      
      <!-- Modal Footer -->
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            :disabled="loading"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleSubmit"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {{ loading ? 'Ekleniyor...' : 'Müşteri Ekle' }}
          </button>
          <button
            :disabled="loading"
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleClose"
          >
            İptal
        </button>
      </div>
    </div>
  </div>
</template>
