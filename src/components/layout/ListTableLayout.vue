<script setup>
defineProps(["class"]);
</script>
<template>
  <div
    class="relative shadow-md sm:rounded-lg mt-5 overflow-auto w-full xl:w-2/3 m-auto"
  >
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <slot />
    </table>
  </div>
</template>
