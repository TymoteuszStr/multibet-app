<script setup lang="ts">
import { computed } from "vue";
interface Props {
  modelValue?: string | number;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

interface Emits {
  (e: "update:modelValue", value: string | number): void;
}

withDefaults(defineProps<Props>(), {
  type: "number",
  placeholder: "",
  disabled: false,
});

const emit = defineEmits<Emits>();

const modelValue = defineModel<string | number>();
</script>
<template>
  <div class="input-wrapper">
    <span class="input__label">Stake:</span>
    <input
      class="base-input"
      :type="type"
      v-model="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <span class="currency-icon">€</span>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--surface);
  border: 1px solid var(--overlay-md);
  border-radius: 8px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover:not(.disabled) {
    border-color: var(--overlay-lg);
  }

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
.input__label {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--muted);
  margin-left: 10px;
}
.currency-icon {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--primary);
  margin-right: 10px;
}

.base-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-color);
  padding: 12px 16px;
  font-size: 1.3rem;
  font-family: inherit;
  width: 100%;
  text-align: right;

  &::placeholder {
    color: var(--muted);
    opacity: 0.6;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &[type="number"] {
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
