<script setup>
defineProps(["addClass"]);
</script>
<template>
  <form
    class="flex flex-col xl:flex-row w-1/2 lg:w-1/3 items-center m-auto justify-center gap-5"
    :class="addClass"
  >
    <slot />
  </form>
</template>
