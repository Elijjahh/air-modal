<script setup lang="ts">
import type { MaskInputOptions } from 'maska';

const props = defineProps<{ label: string; type?: 'default' | 'date' }>();
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
      <BaseInputMask v-model="start" label="с" mask="##.##.####" type="horizontal" />
      <BaseInputMask v-model="end" label="по" mask="##.##.####" type="horizontal" />
    </template>
    <template v-else>
      <BaseInputMask v-model="start" label="от" :mask="options" type="horizontal" />
      <BaseInputMask v-model="end" label="до" :mask="options" type="horizontal" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.range {
  display: flex;
  gap: 8px;
}
</style>
