<script setup lang="ts">
import { ref } from "vue";
import {
  faChevronDown,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface DropdownItem {
  id: string;
  label: string;
  icon?: IconDefinition;
}

interface Props {
  header: { label: string; icon?: IconDefinition };
  items: DropdownItem[];
}
const emit = defineEmits<{
  (e: "item-click", id: string): void;
}>();
defineProps<Props>();
const isOpen = ref(true);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="dropdown">
    <div class="dropdown__header" @click="toggleDropdown">
      <span class="dropdown__header__label"
        >{{ header.label }}

        <font-awesome-icon
          v-if="header.icon"
          :icon="header.icon"
          class="dropdown__header__icon"
        />
      </span>
      <font-awesome-icon
        :icon="faChevronDown"
        class="dropdown__header__icon"
        :class="{ rotated: isOpen }"
      />
    </div>
    <Transition name="dropdown">
      <ul v-if="isOpen" class="dropdown__list">
        <li
          v-for="item in items"
          :key="item.id"
          class="dropdown__list__item"
          @click="$emit('item-click', item.id)"
        >
          {{ item.label }}
          <font-awesome-icon
            v-if="item.icon"
            :icon="item.icon"
            class="dropdown__list__item__icon"
          />
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 12px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
    font-weight: 600;
    font-size: 1.2rem;
    &__label {
      color: var(--primary);
    }
    &:hover {
      background-color: var(--overlay-md);
    }

    &__icon {
      color: var(--primary);
      margin-left: auto;
      transition: transform 0.3s ease;

      &.rotated {
        transform: rotate(180deg);
      }
    }
  }
  &__list {
    list-style: none;
    padding: 0;
    margin: 8px 0 0 0;
    overflow: hidden;
    border-radius: 8px;

    &__item {
      padding: 10px 16px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:hover {
        background-color: var(--overlay-sm);
      }

      &:first-child {
        padding-top: 12px;
      }

      &:last-child {
        padding-bottom: 12px;
      }

      &__icon {
        animation: pulse 2s ease-in-out infinite;
        color: var(--negative);
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

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}
</style>
