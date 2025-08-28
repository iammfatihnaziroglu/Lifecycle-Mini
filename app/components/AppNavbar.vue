<script setup lang="ts">

const isOpen = ref(false);
const notificationCount = ref(3);
const isUserMenuOpen = ref(false);
const isQuickAddOpen = ref(false);

const userName = ref("Mehmet Fatih");
const userInitials = computed(() => {
  return userName.value
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
});
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

        <!-- Middle: Quick Add (+) -->
        <div class="hidden md:flex items-center">
          <button
            aria-label="Hızlı Ekle"
            class="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-sm active:scale-[0.98] transition-all duration-200"
            @click="isQuickAddOpen = true"
          >
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <span class="text-sm font-medium">Hızlı Ekle</span>
          </button>
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

          <!-- Divider -->
          <div class="hidden md:block w-px h-6 bg-gray-200 mx-1" />
          
          <!-- User Menu -->
          <div class="relative">
            <button 
              class="flex items-center gap-2 pl-2 pr-2 py-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200"
              @click="isUserMenuOpen = !isUserMenuOpen"
            >
              <div class="hidden md:flex flex-col items-end">
                <span class="text-sm font-medium text-gray-800 leading-none">{{ userName }}</span>
                <span class="text-[10px] text-gray-500 leading-none mt-0.5">Çevrimiçi</span>
              </div>
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-xs font-semibold ring-1 ring-gray-200">
                {{ userInitials }}
              </div>
              <svg class="hidden md:block w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-show="isUserMenuOpen"
                class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200/70 overflow-hidden z-50"
              >
                <div class="px-3 py-3 border-b border-gray-100">
                  <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                  <p class="text-xs text-gray-500">Kullanıcı</p>
                </div>
                <div class="py-1">
                  <NuxtLink to="/profile" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    Profil
                  </NuxtLink>
                  <NuxtLink to="/settings" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14,12.94a7.43,7.43,0,0,0,.05-.94,7.43,7.43,0,0,0-.05-.94l2.11-1.65a.5.5,0,0,0,.12-.64l-2-3.46a.5.5,0,0,0-.6-.22l-2.49,1a7.28,7.28,0,0,0-1.63-.94l-.38-2.65A.5.5,0,0,0,13.7,2H10.3a.5.5,0,0,0-.49.41L9.43,5.06a7.28,7.28,0,0,0-1.63.94l-2.49-1a.5.5,0,0,0-.6.22l-2,3.46a.5.5,0,0,0,.12.64L4,11.06a7.43,7.43,0,0,0,0,1.88L2.91,14.59a.5.5,0,0,0-.12.64l2,3.46a.5.5,0,0,0,.6.22l2.49-1a7.28,7.28,0,0,0,1.63.94l.38,2.65a.5.5,0,0,0,.49.41h3.4a.5.5,0,0,0,.49-.41l.38-2.65a7.28,7.28,0,0,0,1.63-.94l2.49,1a.5.5,0,0,0,.6-.22l2-3.46a.5.5,0,0,0-.12-.64ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                    Ayarlar
                  </NuxtLink>
                </div>
                <div class="py-1 border-t border-gray-100">
                  <button 
                    class="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    @click="console.log('logout')"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8c-1.1 0-2 .9-2 2v4h2V5h8v14h-8v-4h-2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                    Çıkış
                  </button>
                </div>
              </div>
            </Transition>
          </div>

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
      
    </div>
  </nav>

  <!-- Quick Add Modal -->
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="isQuickAddOpen" class="fixed inset-0 z-[60] flex items-center justify-center">
      <div class="absolute inset-0 bg-black/30" @click="isQuickAddOpen = false" />
      <div class="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 class="text-sm font-semibold text-gray-900">Hızlı Yeni Ekle</h3>
          <button class="p-1.5 rounded-md hover:bg-gray-100" aria-label="Kapat" @click="isQuickAddOpen = false">
            <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
        <div class="p-4 grid grid-cols-1 gap-2">
          <NuxtLink
            to="/customers/new"
            class="group flex items-center justify-between px-3 py-3 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/40 transition-all"
            @click="isQuickAddOpen = false"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Müşteri Ekle</p>
                <p class="text-xs text-gray-500">Yeni müşteri kaydı oluştur</p>
              </div>
            </div>
            <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/></svg>
          </NuxtLink>

          <NuxtLink
            to="/properties/new"
            class="group flex items-center justify-between px-3 py-3 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50/40 transition-all"
            @click="isQuickAddOpen = false"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">İlan Ekle</p>
                <p class="text-xs text-gray-500">Yeni emlak ilanı oluştur</p>
              </div>
            </div>
            <svg class="w-4 h-4 text-gray-400 group-hover:text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/></svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </Transition>
</template>