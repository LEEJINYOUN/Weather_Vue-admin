<script setup>
defineProps(["value", "text", "onClick"]);
</script>
<template>
  <button
    :value="value"
    class="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>
