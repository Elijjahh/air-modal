<script lang="ts" setup>
const isVisible = defineModel<boolean>('visible');
</script>

<template>
  <BaseModal v-model:visible="isVisible">
    <div class="thank-you-modal">
      <h2 class="thank-you-modal__title">Спасибо</h2>

      <p class="thank-you-modal__text">Спасибо за оставленную заявку, мы вам перезвоним</p>

      <BaseButton class="thank-you-modal__btn" @click="isVisible = false">Ок</BaseButton>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
.thank-you-modal {
  &__title {
    color: rgb(26, 38, 61);

    font-size: 24px;
    font-weight: 600;
    line-height: 110%;
    letter-spacing: 0%;
  }

  &__text {
    margin-top: 20px;
  }

  &__btn {
    margin-top: 40px;
  }
}
</style>
