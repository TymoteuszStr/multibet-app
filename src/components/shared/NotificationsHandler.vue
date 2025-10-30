<script setup lang="ts">
import { useNotifications } from "@/composables/useNotifications";
import Notification from "./Notification.vue";

const { notifications, deleteNotificationById } = useNotifications();
</script>

<template>
  <transition-group
    tag="div"
    name="notification"
    class="flex row no-wrap gap-3 items-center notifications"
  >
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
      @remove="deleteNotificationById(notification.id)"
    />
  </transition-group>
</template>

<style scoped lang="scss">
.notifications {
  width: 320px;
  height: fit-content;
  position: fixed;
  bottom: 20px;
  right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  pointer-events: none;
  gap: 12px;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.notification-enter-active {
  transition: all 0.4s ease-out;
}
.notification-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.notification-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.notification-leave-active {
  transition: all 0.3s ease-in;
}
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
