<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { MAX_STAKE, MIN_STAKE } from "@/assets/constants";

interface Props {
  modelValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  showIncrementButtons?: boolean;
  min?: number;
  max?: number;
}

interface Emits {
  (e: "update:modelValue", value: string | number): void;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  disabled: false,
  showIncrementButtons: true,
  min: MIN_STAKE,
  max: MAX_STAKE,
});

const emit = defineEmits<Emits>();

const modelValue = defineModel<string | number>();

function preventInvalidKeys(e: KeyboardEvent) {
  if (["-", "e", "E", "+", ".", ","].includes(e.key)) {
    e.preventDefault();
    return;
  }

  if (e.key === "0" && props.min > 0) {
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

  value = value.replace(/[.,]/g, "");

  if (value.length > 0) {
    const withoutLeadingZeros = value.replace(/^0+(?=\d)/, "");
    value = withoutLeadingZeros;

    if (props.min > 0 && (value === "0" || /^0/.test(value))) {
      value = "";
    }

    const numValue = Number(value);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(props.min, Math.min(props.max, numValue));
      value = clampedValue.toString();

      if (clampedValue !== numValue) {
        el.value = value;
      }
    }
  }

  el.value = value;
  (modelValue as any).value = value;
}

function increment() {
  if (props.disabled) return;
  const currentValue = Number(modelValue.value) || props.min;
  const newValue = Math.min(props.max, currentValue + 1);
  (modelValue as any).value = newValue;
  emit("update:modelValue", newValue);
}

function decrement() {
  if (props.disabled) return;
  const currentValue = Number(modelValue.value) || props.min;
  const newValue = Math.max(props.min, currentValue - 1);
  (modelValue as any).value = newValue;
  emit("update:modelValue", newValue);
}
</script>
<template>
  <div class="input-wrapper">
    <button
      v-if="props.showIncrementButtons"
      class="increment-btn increment-btn--minus"
      :disabled="props.disabled"
      @click="decrement"
      type="button"
      aria-label="Decrease value"
    >
      <font-awesome-icon :icon="faMinus" />
    </button>
    <span class="input__label">Stake:</span>
    <input
      class="base-input"
      v-model="modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      type="number"
      :min="props.min"
      :max="props.max"
      step="1"
      inputmode="numeric"
      @keydown="preventInvalidKeys"
      @input="sanitizeOnInput"
    />
    <span class="currency-icon">€</span>
    <button
      v-if="props.showIncrementButtons"
      class="increment-btn increment-btn--plus"
      :disabled="props.disabled"
      @click="increment"
      type="button"
      aria-label="Increase value"
    >
      <font-awesome-icon :icon="faPlus" />
    </button>
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

.increment-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background-color: var(--overlay-md);
  color: var(--text-color);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  font-size: 0.9rem;
  padding: 0;

  &:hover:not(:disabled) {
    background-color: var(--overlay-lg);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
    background-color: var(--overlay-md);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--minus {
    margin-left: 8px;
    margin-right: 8px;
  }

  &--plus {
    margin-left: 8px;
    margin-right: 8px;
  }
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
