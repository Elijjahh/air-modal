<script lang="ts" setup>
const isVisible = ref(false);
const thankYouVisible = ref(false);
</script>

<template>
  <main class="main">
    <BaseButton class="main__btn" @click="isVisible = true">Стать резидентом</BaseButton>
    <ResidenceModal v-model:visible="isVisible" @show-thank-you="thankYouVisible = true" />
    <ThankYouModal v-model:visible="thankYouVisible" />
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
