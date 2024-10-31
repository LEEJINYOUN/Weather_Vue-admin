<script setup>
defineProps(["type"]);
</script>
<template>
  <th v-if="type == 'title'" scope="col" class="px-6 py-3"><slot /></th>
  <td v-if="type == 'content'" class="px-6 py-4"><slot /></td>
</template>
