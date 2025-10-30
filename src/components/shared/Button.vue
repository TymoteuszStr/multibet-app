<script setup lang="ts">
defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <button type="button" class="base-btn" :class="{ disabled }"><slot /></button>
</template>

<style scoped lang="scss">
.base-btn {
  background-color: var(--primary);
  color: var(--primary-contrast, #fff);
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: var(--primary-hover);
  }

  &:active {
    background-color: var(--primary-active);
    transform: translateY(1px);
  }

  &.sm {
    padding: 6px 12px;
    font-size: 0.875rem;
  }
  &.md {
    padding: 10px 18px;
    font-size: 1rem;
  }
  &.lg {
    padding: 14px 24px;
    font-size: 1.125rem;
  }

  &.fullWidth {
    width: 100%;
  }

  &.rounded {
    border-radius: 12px;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
