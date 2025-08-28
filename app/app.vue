<script setup lang="ts">
const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function closeSidebar() {
  isSidebarOpen.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Navbar (fixed at top) -->
    <header class="sticky top-0 z-50">
      <AppNavbar @toggle-sidebar="toggleSidebar" />
    </header>
    
    <!-- Main Layout with Sidebar -->
    <div class="relative">
      <!-- Sidebar -->
      <AppSidebar :is-open="isSidebarOpen" @close="closeSidebar" />
      
      <!-- Main Content -->
      <main class="md:ml-64 transition-all duration-300 min-h-[calc(100vh-4rem)]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <NuxtPage />
        </div>
      </main>
    </div>
  </div>
</template>
