<script setup lang="ts">
import { vMaska } from 'maska/vue';
import type { MaskInputOptions } from 'maska';

defineProps<{ label: string; mask: string | MaskInputOptions; type?: 'default' | 'horizontal' }>();

const value = defineModel<string>({ default: '' });
const unmaskedValue = defineModel<string>('unmasked');

defineExpose({ unmaskedValue });
</script>

<template>
  <BaseInput v-model="value" v-maska:unmaskedValue.unmasked="mask" :label="label" :type="type" />
</template>
