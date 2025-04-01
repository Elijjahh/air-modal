<script setup lang="ts">
import type { MaskInputOptions } from 'maska';

const props = defineProps<{
  label: string;
  type?: 'default' | 'date';
  startError?: string;
  endError?: string;
}>();

const start = defineModel<string>('start');
const end = defineModel<string>('end');

const isDates = computed(() => {
  return props.type === 'date';
});

const options = reactive<MaskInputOptions>({
  number: {
    locale: 'ru',
  },
});
</script>

<template>
  <div class="range">
    <template v-if="isDates">
      <div class="range__group">
        <BaseInputMask
          v-model="start"
          label="с"
          mask="##.##.####"
          :invalid="!!startError"
          type="horizontal"
        />
        <p v-if="startError" class="range__error">
          {{ startError }}
        </p>
      </div>

      <div class="range__group">
        <BaseInputMask
          v-model="end"
          label="по"
          mask="##.##.####"
          :invalid="!!endError"
          type="horizontal"
        />
        <p v-if="endError" class="range__error">
          {{ endError }}
        </p>
      </div>
    </template>
    <template v-else>
      <div class="range__group">
        <BaseInputMask
          v-model:unmasked="start"
          label="от"
          :mask="options"
          :invalid="!!startError"
          type="horizontal"
        />
        <p v-if="startError" class="range__error">
          {{ startError }}
        </p>
      </div>

      <div class="range__group">
        <BaseInputMask
          v-model:unmasked="end"
          label="до"
          :mask="options"
          :invalid="!!endError"
          type="horizontal"
        />
        <p v-if="endError" class="range__error">
          {{ endError }}
        </p>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.range {
  display: flex;
  gap: 8px;

  &__group {
    width: 100%;
  }

  &__error {
    margin-top: 10px;
    color: red;
  }
}
</style>
