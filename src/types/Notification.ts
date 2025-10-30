export const NotifcationTypes = {
  Warning: "warning",
  Error: "error",
  Success: "success",
  Default: "default",
} as const;

export type NotifcationTypes =
  (typeof NotifcationTypes)[keyof typeof NotifcationTypes];

export type Notification = {
  id: string;
  type: NotifcationTypes;
  title: string;
  description?: string;
};
