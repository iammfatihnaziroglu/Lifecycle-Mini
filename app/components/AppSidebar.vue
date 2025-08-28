<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
}>();

const route = useRoute();

const menuItems = [
  {
    name: 'Müşteriler',
    path: '/customers',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
  },
  {
    name: 'İlanlar',
    path: '/properties',
    icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'
  },
  {
    name: 'Bildirimler',
    path: '/alerts',
    icon: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z'
  },
  {
    name: 'AI İçerik',
    path: '/ai',
    icon: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'
  }
];
</script>

<template>
  <div>
    <!-- Overlay for mobile -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/30 z-40 md:hidden"
      @click="$emit('close')"
    />

    <!-- Sidebar -->
    <div
      :class="[
        'fixed left-0 top-16 bottom-0 z-40 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <!-- Sidebar Header -->
      <div class="py-4 px-4 flex items-center justify-between border-b border-gray-200">
        <NuxtLink 
          to="/dashboard" 
          class="text-sm font-medium text-gray-700 hover:text-blue-600 uppercase tracking-wider flex items-center gap-2 transition-colors"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          ANASAYFA
        </NuxtLink>
        
        <!-- Close button (mobile only) -->
        <button
          class="md:hidden p-1.5 rounded-md hover:bg-gray-100"
          @click="$emit('close')"
        >
          <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      
      <!-- Navigation Menu -->
      <nav class="mt-2">
        <div class="px-2 space-y-1">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
              route.path.startsWith(item.path)
                ? 'bg-gradient-to-r from-blue-50 to-blue-50/30 text-blue-700 shadow-sm border border-blue-100/50'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            <div class="mr-3 flex items-center justify-center w-7 h-7">
              <svg 
                class="w-5 h-5" 
                :class="[route.path.startsWith(item.path) ? 'text-blue-600' : 'text-gray-500']"
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path :d="item.icon" />
              </svg>
            </div>
            {{ item.name }}
          </NuxtLink>
        </div>
      </nav>
      
      <!-- Bottom section -->
      <div class="absolute bottom-0 left-0 right-0 border-t border-gray-200">
        <div class="p-4">
          <NuxtLink to="/settings" class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-xs font-semibold ring-1 ring-gray-200">
                  MF
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-800">Mehmet Fatih</p>
                <p class="text-xs text-gray-500">Yönetici</p>
              </div>
            </div>
            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.14,12.94a7.43,7.43,0,0,0,.05-.94,7.43,7.43,0,0,0-.05-.94l2.11-1.65a.5.5,0,0,0,.12-.64l-2-3.46a.5.5,0,0,0-.6-.22l-2.49,1a7.28,7.28,0,0,0-1.63-.94l-.38-2.65A.5.5,0,0,0,13.7,2H10.3a.5.5,0,0,0-.49.41L9.43,5.06a7.28,7.28,0,0,0-1.63.94l-2.49-1a.5.5,0,0,0-.6.22l-2,3.46a.5.5,0,0,0,.12.64L4,11.06a7.43,7.43,0,0,0,0,1.88L2.91,14.59a.5.5,0,0,0-.12.64l2,3.46a.5.5,0,0,0,.6.22l2.49-1a7.28,7.28,0,0,0,1.63.94l.38,2.65a.5.5,0,0,0,.49.41h3.4a.5.5,0,0,0,.49-.41l.38-2.65a7.28,7.28,0,0,0,1.63-.94l2.49,1a.5.5,0,0,0,.6-.22l2-3.46a.5.5,0,0,0-.12-.64ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
