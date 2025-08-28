<script setup lang="ts">
interface Column {
  key: string
  label: string
  sortable?: boolean
  formatter?: (value: any, row: any) => string
  component?: any
  componentProps?: (row: any) => Record<string, any>
}

interface Props {
  columns: Column[]
  data: any[]
  loading?: boolean
  emptyMessage?: string
  emptyDescription?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  emptyMessage: 'Henüz veri yok',
  emptyDescription: 'İlk kaydınızı ekleyerek başlayın.'
})
</script>

<template>
  <div class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="(row, index) in data" 
            :key="index"
            class="hover:bg-gray-50 transition-colors"
          >
            <td 
              v-for="column in columns" 
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap"
            >
              <!-- Component kullanılacaksa -->
              <component 
                v-if="column.component"
                :is="column.component"
                v-bind="column.componentProps?.(row) || {}"
              />
              <!-- Formatter kullanılacaksa -->
              <div 
                v-else-if="column.formatter"
                class="text-sm text-gray-900"
                v-html="column.formatter(row[column.key], row)"
              />
              <!-- Normal değer -->
              <div 
                v-else
                :class="[
                  'text-sm',
                  column.key === 'name' || column.key === 'budget' 
                    ? 'font-medium text-gray-900' 
                    : 'text-gray-600'
                ]"
              >
                {{ row[column.key] }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Boş durum -->
    <div v-if="data.length === 0 && !loading" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">{{ emptyMessage }}</h3>
      <p class="mt-1 text-sm text-gray-500">{{ emptyDescription }}</p>
    </div>

    <!-- Loading durumu -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-flex items-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-sm text-gray-500">Yükleniyor...</span>
      </div>
    </div>
  </div>
</template>
