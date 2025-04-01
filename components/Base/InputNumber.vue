<script setup lang="ts">
const inputId = useId();

const props = defineProps<{
  label: string;
  type?: 'default' | 'horizontal';
}>();

const value = defineModel<number>({ default: 0 });

function isNumber(evt: KeyboardEvent): void {
  const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  const keyPressed = evt.key;

  if (!keysAllowed.includes(keyPressed)) {
    evt.preventDefault();
  }
}

const isHorizontal = computed(() => {
  return props.type === 'horizontal';
});
</script>

<template>
  <div class="input" :class="{ horizontal: isHorizontal }">
    <input :id="inputId" v-model="value" type="number" class="input__body" @keypress="isNumber" />
    <label :for="inputId" class="input__label">
      {{ label }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
.input {
  position: relative;
  width: 100%;
  border: 2px solid #f7f8f8;
  border-radius: 6px;

  transition: border 0.3s;

  &:has(&__body:focus) {
    border: 2px solid rgb(23, 75, 124);
  }

  &__body {
    border-radius: inherit;
    width: 100%;
    padding: 33px 20px 10px;
    border: none;
    outline: none;

    color: rgb(23, 75, 124);
    font-size: 18px;
    font-weight: 500;
    line-height: 110%;
    letter-spacing: 0%;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  &.horizontal &__body {
    text-align: right;
    padding: 20px;
  }

  &__label {
    position: absolute;
    top: 50%;
    left: 20px;
    translate: 0 -50%;

    color: rgb(23, 75, 124);

    font-size: 14px;
    font-weight: 300;
    line-height: 110%;
    letter-spacing: 0%;

    transition: all 0.3s;
  }

  &:not(.horizontal) &__body:focus + &__label,
  &:not(.horizontal) &__body.filled + &__label {
    top: 10px;
    translate: 0;
    pointer-events: none;
  }
}
</style>
