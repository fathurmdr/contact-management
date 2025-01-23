"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import useConfirmModal from "@/client/hooks/useConfirmModal";
import { deleteGroup } from "@/app/(main)/groups/action";
import useNotification from "@/client/hooks/useNotification";

interface DeleteGroupProps {
  groupId: number;
}

export default function DeleteGroup({ groupId }: DeleteGroupProps) {
  const router = useRouter();
  const { confirmModal } = useConfirmModal();
  const { showNotification } = useNotification();

  async function handleDelete() {
    const result = await deleteGroup(groupId);
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
      router.replace("/groups");
    }
  }

  return (
    <Button
      danger
      onClick={() => {
        confirmModal({
          title: "Delete this Group?",
          text: "Are you sure you want to delete this Group?",
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
