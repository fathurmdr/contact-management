"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import useConfirmModal from "@/client/hooks/useConfirmModal";
import { deleteContact } from "@/app/(main)/contacts/action";
import useNotification from "@/client/hooks/useNotification";

interface DeleteContactProps {
  contactId: number;
}

export default function DeleteContact({ contactId }: DeleteContactProps) {
  const router = useRouter();
  const { confirmModal } = useConfirmModal();
  const { showNotification } = useNotification();

  async function handleDelete() {
    const result = await deleteContact(contactId);
    if (result?.errorMsg) {
      showNotification.error({
        message: "Error",
        description: result.errorMsg,
      });
    } else {
      showNotification.success({
        message: "Success",
        description: "Contact deleted successfully",
      });
      router.replace("/contacts");
    }
  }

  return (
    <Button
      danger
      onClick={() => {
        confirmModal({
          title: "Delete this Contact?",
          text: "Are you sure you want to delete this Contact?",
          onOk: handleDelete,
          okText: "Delete",
          danger: true,
        });
      }}
    >
      Delete
    </Button>
  );
}
