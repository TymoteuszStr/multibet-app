<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
}

interface Emits {
  (e: "update:modelValue", value: string | number): void;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  disabled: false,
});

const emit = defineEmits<Emits>();

const modelValue = defineModel<string | number>();

function preventInvalidKeys(e: KeyboardEvent) {
  if (["-", "e", "E", "+"].includes(e.key)) {
    e.preventDefault();
    return;
  }

  if (e.key === "0") {
    const el = e.target as HTMLInputElement | null;
    if (!el) return;
    const cursorAtStart = el.selectionStart === 0 && el.selectionEnd === 0;
    const emptyBeforeType = el.value.length === 0;
    if (cursorAtStart || emptyBeforeType) {
      e.preventDefault();
    }
  }
}

function sanitizeOnInput(e: Event) {
  const el = e.target as HTMLInputElement;
  if (!el) return;
  let value = el.value;

  if (value.startsWith("-")) {
    value = value.replace(/^-+/, "");
  }

  if (value.length > 0) {
    const withoutLeadingZeros = value.replace(/^0+(?=\d)/, "");
    value = withoutLeadingZeros;

    if (value === "0" || /^0/.test(value) || value.startsWith(".")) {
      value = "";
    }
  }

  el.value = value;
  (modelValue as any).value = value;
}
</script>
<template>
  <div class="input-wrapper">
    <span class="input__label">Stake:</span>
    <input
      class="base-input"
      v-model="modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      type="number"
      :min="1"
      step="any"
      inputmode="decimal"
      @keydown="preventInvalidKeys"
      @input="sanitizeOnInput"
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
    appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
