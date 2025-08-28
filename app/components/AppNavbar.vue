<script setup lang="ts">

const route = useRoute();
const isOpen = ref(false);
const notificationCount = ref(3);

const links = [
  { 
    name: "Dashboard", 
    path: "/dashboard",
    description: "Ana kontrol paneli"
  },
  { 
    name: "Müşteriler", 
    path: "/customers",
    description: "Müşteri yönetimi"
  },
  { 
    name: "İlanlar", 
    path: "/properties",
    description: "Emlak ilanları"
  },
  { 
    name: "Eşleştirme", 
    path: "/match",
    description: "Akıllı eşleştirme"
  },
  { 
    name: "AI Generator", 
    path: "/ai",
    description: "Yapay zeka araçları"
  },
];
</script>

<template>
  <nav class="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink 
          to="/dashboard" 
          class="flex items-center space-x-3 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
        >
          <div class="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span class="text-blue-600 font-bold text-sm">L</span>
            </div>
          </div>
          <div class="hidden sm:block">
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Lifecycle
            </span>
            <span class="text-gray-600 font-normal ml-1">Mini</span>
          </div>
        </NuxtLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            :class="[
              'group flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
              route.path === link.path 
                ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            ]"
          >
            <span>{{ link.name }}</span>
          </NuxtLink>
        </div>

        <!-- Right Side -->
        <div class="flex items-center space-x-2">
          <!-- Notifications -->
          <div class="relative">
            <button class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
            </button>
            <span 
              v-if="notificationCount > 0" 
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
            >
              {{ notificationCount > 9 ? '9+' : notificationCount }}
            </span>
          </div>
          
          <!-- User Profile -->
          <button class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>

          <!-- Mobile Menu Toggle -->
          <button 
            class="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
            @click="isOpen = !isOpen"
          >
            <svg v-if="!isOpen" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-show="isOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm border-t border-gray-200/50">
            <NuxtLink
              v-for="link in links"
              :key="link.path"
              :to="link.path"
              :class="[
                'group flex items-center space-x-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-200',
                route.path === link.path 
                  ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              ]"
              @click="isOpen = false"
            >
              <div class="flex flex-col">
                <span>{{ link.name }}</span>
                <span class="text-xs text-gray-500 mt-0.5">{{ link.description }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>