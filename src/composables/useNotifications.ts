import { type Ref, ref } from "vue";
import { type Notification, type NotifcationTypes } from "@/types/Notification";

type NotificationInput = Omit<Notification, "id">;
const notifications: Ref<Notification[]> = ref([]);

const antiSpam = (notification: NotificationInput) => {
  return notifications.value.some(
    (notify) => notify.title === notification.title
  );
};

export function useNotifications() {
  const addNotification = (notification: NotificationInput) => {
    if (antiSpam(notification)) return;
    const id = crypto.randomUUID();
    const newNotification = { ...notification, id };
    notifications.value.push(newNotification);

    setTimeout(() => {
      deleteNotificationById(newNotification.id);
    }, 5000);
  };

  const deleteNotificationById = (id: string) => {
    const index = notifications.value.findIndex((notify) => notify.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  };

  return { notifications, addNotification, deleteNotificationById };
}
