<script setup lang="ts">
interface Props {
  score: 'Low' | 'Medium' | 'High'
}

defineProps<Props>()

// Skor tipine göre stil ve renk belirleme
function getScoreStyles(score: string) {
  switch (score) {
    case 'High':
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-200',
        label: 'Yüksek'
      }
    case 'Medium':
      return {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        borderColor: 'border-yellow-200',
        label: 'Orta'
      }
    case 'Low':
      return {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-200',
        label: 'Düşük'
      }
    default:
      return {
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        borderColor: 'border-gray-200',
        label: 'Bilinmiyor'
      }
  }
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      getScoreStyles(score).bgColor,
      getScoreStyles(score).textColor,
      getScoreStyles(score).borderColor
    ]"
  >
    <!-- Skor ikonu -->
    <svg 
      class="w-3 h-3 mr-1" 
      :class="getScoreStyles(score).textColor"
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <!-- Yüksek skor için yukarı ok -->
      <path 
        v-if="score === 'High'"
        d="M7 14l5-5 5 5z"
      />
      <!-- Orta skor için yatay çizgi -->
      <path 
        v-else-if="score === 'Medium'"
        d="M8 12h8"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
      <!-- Düşük skor için aşağı ok -->
      <path 
        v-else
        d="M7 10l5 5 5-5z"
      />
    </svg>
    
    {{ getScoreStyles(score).label }}
  </span>
</template>

<style scoped>
/* Hover efekti için ek stiller */
.score-badge:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}
</style>
