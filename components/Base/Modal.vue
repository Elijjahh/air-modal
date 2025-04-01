<script setup lang="ts">
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component';

const isVisible = defineModel<boolean>('visible');
</script>

<template>
  <Teleport to="body">
    <Transition>
      <UseFocusTrap v-if="isVisible" :options="{ immediate: true }">
        <div class="modal" role="dialog" aria-modal="true">
          <div class="modal__overlay" aria-hidden="true" @click="isVisible = false" />
          <div class="modal__body">
            <slot />
          </div>
        </div>
      </UseFocusTrap>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.modal {
  position: fixed;
  inset: 0;
  width: 100%;

  &__overlay {
    cursor: pointer;
    position: absolute;
    inset: 0;
    background: rgba(88, 88, 88, 0.64);
  }

  &__body {
    position: relative;
    margin: 50px auto;

    background: rgb(255, 255, 255);
    padding: 40px;
    width: min(800px, 90vw);
  }
}
</style>
