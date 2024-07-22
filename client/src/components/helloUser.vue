<template>
  <div>
    <p class="text-h4 h4"> Hello {{ userName }}</p>
  </div>
</template>

<script setup>

defineProps({
  userName: String
})

</script>

<style lang="scss" scoped></style>
