<script setup>
defineProps(["message"]);
</script>
<template>
  <span class="text-red-500 font-bold text-xs flex mt-1 py-1 pl-1">
    {{ message }}
  </span>
</template>
