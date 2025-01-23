"use client";

import { Button, Form, Select } from "antd";
import { useRouter } from "next/navigation";
import { ContactType } from "@/app/(main)/contacts/data";
import { addGroupMember } from "@/app/(main)/groups/action";
import useNotification from "@/client/hooks/useNotification";

interface AddMemberFormProps {
  id: number;
  contacts: ContactType[];
}

export default function AddMemberForm({ id, contacts }: AddMemberFormProps) {
  const { showNotification } = useNotification();
  const router = useRouter();

  async function handleSubmit(values: any) {
    values.phoneNumber = values.dialCode + "-" + values.phoneNumber;
    const result = await addGroupMember(values, id);
    if (result?.errorMsg) {
      showNotification.error({
        message: "Error",
        description: result.errorMsg,
      });
    } else {
      showNotification.success({
        message: "Success",
        description: "Member added successfully",
      });
      router.push("/groups");
    }
  }
  return (
    <>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item name="contactId" rules={[{ required: true }]}>
          <Select
            placeholder="Contact"
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={contacts.map((contact) => ({
              value: contact.id,
              label: contact.fullName,
              key: contact.id,
            }))}
          />
        </Form.Item>
        <Form.Item className="w-full">
          <Button htmlType="submit" type="primary" className="w-full">
            Add Member
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
