"use client";

import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { GroupType } from "../../data";
import useNotification from "@/client/hooks/useNotification";

interface GroupFormProps {
  id?: number;
  initialValues?: GroupType;
  onSubmit: (
    values: any,
    id?: number,
  ) => Promise<{ errorMsg: string } | undefined>;
}

export default function AddGroupForm({
  id,
  initialValues,
  onSubmit,
}: GroupFormProps) {
  const { showNotification } = useNotification();
  const router = useRouter();

  async function handleSubmit(values: any) {
    values.phoneNumber = values.dialCode + "-" + values.phoneNumber;
    const result = await onSubmit(values, id);
    if (result?.errorMsg) {
      showNotification.error({
        message: "Error",
        description: result.errorMsg,
      });
    } else {
      showNotification.success({
        message: "Success",
        description: "Group saved successfully",
      });
      router.push("/groups");
    }
  }
  return (
    <Form
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item name="description">
        <Input placeholder="Description" />
      </Form.Item>
      <Form.Item className="!mt-16 w-full">
        <Button htmlType="submit" type="primary" className="w-full">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
