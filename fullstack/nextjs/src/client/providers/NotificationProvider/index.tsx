"use client";

import { message, notification } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { NotificationInstance } from "antd/es/notification/interface";
import { ReactNode, createContext } from "react";

export const NotificationContext = createContext<{
  showNotification?: NotificationInstance;
  showMessage?: MessageInstance;
}>({});

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showNotification, contextHolderNotification] =
    notification.useNotification();
  const [showMessage, contextHolderMessage] = message.useMessage();

  return (
    <NotificationContext.Provider value={{ showNotification, showMessage }}>
      {contextHolderNotification}
      {contextHolderMessage}
      {children}
    </NotificationContext.Provider>
  );
}
