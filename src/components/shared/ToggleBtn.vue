<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "change", value: boolean): void;
}>();

const isOn = computed(() => !!props.modelValue);
const sizeClass = computed(() => props.size ?? "md");

function toggle() {
  if (props.disabled) return;
  const next = !isOn.value;
  emit("update:modelValue", next);
  emit("change", next);
}

function onKeydown(e: KeyboardEvent) {
  if (props.disabled) return;
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    toggle();
  }
}
</script>

<template>
  <button
    type="button"
    class="toggle"
    :class="[{ on: isOn, disabled }, sizeClass]"
    role="switch"
    :aria-checked="isOn ? 'true' : 'false'"
    :aria-disabled="disabled ? 'true' : 'false'"
    :disabled="disabled"
    @click="toggle"
    @keydown="onKeydown"
  >
    <span class="knob" />
  </button>
</template>

<style scoped lang="scss">
.toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  background-color: var(--overlay-md);
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: inset 0 0 0 1px var(--overlay-sm);

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.sm {
    width: 38px;
    height: 22px;
  }
  &.md {
    width: 48px;
    height: 28px;
  }
  &.lg {
    width: 64px;
    height: 36px;
  }

  .knob {
    position: absolute;
    left: 2px;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--surface);
    border-radius: 50%;
    box-shadow: 0 2px 6px var(--overlay-md);
    transition: left 0.2s ease, width 0.2s ease, background-color 0.2s ease;
  }

  &.sm .knob {
    width: 18px;
    height: 18px;
  }
  &.md .knob {
    width: 24px;
    height: 24px;
  }
  &.lg .knob {
    width: 30px;
    height: 30px;
  }

  &.on {
    background-color: var(--primary);
    box-shadow: inset 0 0 0 1px var(--primary-hover);
  }

  &.on .knob {
    background-color: var(--primary-contrast, #fff);
  }

  &.on.sm .knob {
    left: calc(100% - 2px - 18px);
  }
  &.on.md .knob {
    left: calc(100% - 2px - 24px);
  }
  &.on.lg .knob {
    left: calc(100% - 2px - 30px);
  }

  &:hover:not(.disabled) {
    box-shadow: inset 0 0 0 1px var(--overlay-lg);
  }

  &:active:not(.disabled) .knob {
    width: calc(100% / 2 + 6px);
  }
}
</style>
