"use client";

import { useContext } from "react";
import { NotificationInstance } from "antd/es/notification/interface";
import { MessageInstance } from "antd/es/message/interface";
import { NotificationContext } from "@/client/providers/NotificationProvider";

export default function useNotification() {
  const { showNotification, showMessage } = useContext(NotificationContext);
  return {
    showNotification: showNotification as NotificationInstance,
    showMessage: showMessage as MessageInstance,
  };
}
