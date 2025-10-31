<script setup lang="ts">
import { computed } from "vue";

export interface FilterOption {
  value: string;
  label: string;
}

interface Props {
  label?: string;
  options: FilterOption[];
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  id: undefined,
});

const modelValue = defineModel<string>({ required: true });

const selectId = computed(
  () => props.id || `filter-select-${Math.random().toString(36).substr(2, 9)}`
);
</script>

<template>
  <div class="filters">
    <label v-if="label" :for="selectId">{{ label }}:</label>
    <select :id="selectId" v-model="modelValue">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;

  label {
    font-weight: 600;
    color: var(--text-color);
    font-size: 0.875rem;
  }

  select {
    padding: 8px 12px;
    padding-right: 32px;
    border-radius: 12px;
    border: none;
    background: var(--surface);
    color: var(--text-color);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;

    &:hover {
      background-color: var(--secondary);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px var(--overlay-xs);
    }

    option {
      background: var(--surface);
      color: var(--text-color);
      padding: 8px;
    }
  }
}
</style>
