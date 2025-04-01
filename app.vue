<script lang="ts" setup>
const isVisible = ref(true);
</script>

<template>
  <main class="main">
    <BaseButton class="main__btn" @click="isVisible = true">Стать резидентом</BaseButton>
    <ResidenceModal v-model:visible="isVisible" />
  </main>
</template>

<style scoped lang="scss">
.main {
  padding-top: 150px;
  &__btn {
    margin: 0 auto;
  }
}
</style>
