<script setup lang="ts">
defineProps<{
  disabled?: boolean;
  isLoading?: boolean;
}>();
</script>

<template>
  <button
    type="button"
    class="base-btn"
    :class="{ disabled, loading: isLoading }"
    :disabled="isLoading"
  >
    <span v-if="isLoading" class="loader" aria-hidden="true"></span>
    <span v-else><slot /></span>
  </button>
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

  &.loading {
    cursor: progress;
  }

  .loader {
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-top-color: var(--primary-contrast, #fff);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    vertical-align: middle;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
