<script setup lang="ts" generic="T extends string | Record<string, unknown>">
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

defineProps<{
  label: string;
  multiple?: boolean;
  options: T[];
  optionLabel: T extends string ? undefined : string;
}>();

const selectedOption = defineModel<T | T[]>();

const select = useTemplateRef('select');
function focusSelect() {
  if (!select.value?.$refs.search) return;
  (select.value?.$refs.search as HTMLInputElement).focus();
}
</script>

<template>
  <div class="select" @click="focusSelect">
    <label class="select__label">{{ label }}</label>
    <VueSelect
      ref="select"
      v-model="selectedOption"
      :clearable="false"
      :searchable="false"
      :multiple="multiple"
      :options="options"
      :label="optionLabel"
      :components="{ OpenIndicator: null }"
    />
    <IconChevronDown class="select__arrow" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.vs__selected-options),
:deep(.vs__selected) {
  padding: 0;
}

:deep(.vs__dropdown-menu) {
  margin-inline: -20px;
  width: calc(100% + 40px);
}

.select {
  --vs-colors--dark: rgb(23, 75, 124);
  --vs-font-size: 18px;
  --vs-line-height: 1.1;
  --vs-border-width: 0;
  --vs-actions-padding: 0;
  --vs-selected-border-width: 0;
  --vs-selected-color: var(--vs-colors--dark);
  --vs-dropdown-option-color: var(--vs-colors--dark);
  --vs-dropdown-option-padding: 3px 5px;
  --vs-dropdown-option--active-bg: rgb(23, 75, 124);
}

.select {
  position: relative;
  cursor: pointer;
  padding: 10px 20px;
  border: 2px solid rgb(247, 248, 248);
  border-radius: 6px;

  transition: border 0.3s;

  &:has(input:focus) {
    border: 2px solid rgb(23, 75, 124);
  }

  &__label {
    cursor: pointer;
    color: rgb(23, 75, 124);
    font-size: 14px;
    font-weight: 300;
    line-height: 110%;
    letter-spacing: 0%;
  }

  &__arrow {
    position: absolute;
    top: 50%;
    right: 20px;

    translate: 0 -50%;
  }
}
</style>
