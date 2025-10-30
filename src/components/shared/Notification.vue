<script setup lang="ts">
import { computed } from "vue";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { type Notification, NotifcationTypes } from "@/types/Notification";

export interface NotificationProps {
  notification: Notification;
}

const { notification } = defineProps<NotificationProps>();
defineEmits(["remove"]);

const styles = computed(() => ({ background: stylesMap[notification.type] }));

const stylesMap = {
  [NotifcationTypes.Success]: "var(--positive)",
  [NotifcationTypes.Warning]: "var(--accent)",
  [NotifcationTypes.Error]: "var(--negative)",
  [NotifcationTypes.Default]: "var(--muted)",
};
</script>

<template>
  <div class="items-center notification">
    <div :style="styles" class="bar-type"></div>
    <div class="notification__info">
      <div class="notification__title">{{ notification.title }}</div>
      <div class="notification__description">
        {{ notification.description }}
      </div>
    </div>
    <font-awesome-icon
      :icon="faXmark"
      class="notification__close"
      @click="$emit('remove')"
    />
  </div>
</template>

<style scoped lang="scss">
.notification {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--secondary);
  padding: 12px 14px;
  width: 320px;
  min-height: 64px;
  z-index: 10;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--text-color);
  pointer-events: auto;
  position: relative;

  .bar-type {
    align-self: stretch;
    width: 4px;
    min-width: 4px;
    border-radius: 6px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    flex: 1;
    min-width: 0;

    & > div {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 14px;
    line-height: 1.2;
    color: var(--text-color);
  }

  &__description {
    font-size: 12px;
    line-height: 1.3;
    color: var(--text-color);
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 10px;

    color: var(--text-color);
    font-size: 14px;
    cursor: pointer;
    transition: color 120ms ease, transform 120ms ease;

    &:hover {
      color: var(--foreground);
      transform: scale(1.05);
    }
  }
}
</style>
