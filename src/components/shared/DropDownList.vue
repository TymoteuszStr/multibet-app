<script setup lang="ts">
import { ref } from "vue";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface DropdownItem {
  id: string;
  label: string;
}

interface Props {
  header: string;
  items: DropdownItem[];
}
const emit = defineEmits<{
  (e: "item-click", id: string): void;
}>();
const props = defineProps<Props>();
const isOpen = ref(true);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="dropdown-list">
    <div class="list-header" @click="toggleDropdown">
      {{ props.header }}
      <font-awesome-icon
        :icon="faChevronDown"
        class="icon"
        :class="{ rotated: isOpen }"
      />
    </div>
    <Transition name="dropdown">
      <ul v-if="isOpen" class="list-content">
        <li
          v-for="item in items"
          :key="item.id"
          class="list-item"
          @click="$emit('item-click', item.id)"
        >
          {{ item.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.dropdown-list {
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 12px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
    font-weight: 600;
    font-size: 1.2rem;
    color: var(--primary);
    &:hover {
      background-color: var(--overlay-md);
    }

    .icon {
      color: var(--primary);
      margin-left: auto;
      transition: transform 0.3s ease;

      &.rotated {
        transform: rotate(180deg);
      }
    }
  }

  .list-content {
    list-style: none;
    padding: 0;
    margin: 8px 0 0 0;
    overflow: hidden;
    border-radius: 8px;

    .list-item {
      padding: 10px 16px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: var(--overlay-sm);
      }

      &:first-child {
        padding-top: 12px;
      }

      &:last-child {
        padding-bottom: 12px;
      }
    }
  }
}

.dropdown-enter-active {
  transition: all 0.3s ease-out;
}

.dropdown-leave-active {
  transition: all 0.25s ease-in;
}

.dropdown-enter-from {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}

.dropdown-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}

.dropdown-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}
</style>
