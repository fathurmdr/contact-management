"use client";

import { useContext } from "react";
import { ConfirmModalContext } from "@/client/providers/ConfirmModalProvider";

export default function useConfirmModal() {
  const { confirmModal } = useContext(ConfirmModalContext);

  return {
    confirmModal,
  };
}
