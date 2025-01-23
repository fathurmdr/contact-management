"use client";

import { Button, Collapse, List, Space } from "antd";
import { GroupType } from "../../data";
import { deleteGroupMember } from "../../action";
import useConfirmModal from "@/client/hooks/useConfirmModal";
import useNotification from "@/client/hooks/useNotification";

interface GroupListProps {
  groups: GroupType[];
}

export default function GroupList({ groups }: GroupListProps) {
  const { confirmModal } = useConfirmModal();
  const { showNotification } = useNotification();

  async function handelRemoveMember(contactId: number, groupId: number) {
    const result = await deleteGroupMember({ contactId }, groupId);
    if (result?.errorMsg) {
      showNotification.error({
        message: "Error",
        description: result.errorMsg,
      });
    } else {
      showNotification.success({
        message: "Success",
        description: "Member removed successfully",
      });
    }
  }

  const groupIds = groups
    .filter((group) => group.members.length > 0)
    .map((group) => group.id);
  return (
    <Collapse
      defaultActiveKey={groupIds}
      items={groups.map((group) => ({
        key: group.id,
        collapsible: "icon",
        headerClass: "flex !items-center",
        label: (
          <div className="flex justify-between">
            <div>
              <p>{group.name}</p>
              <p className="text-xs">{group.description}</p>
            </div>
            <Space>
              <Button
                type="link"
                href={`/groups/${group.id}/add-member`}
                className="!px-0 !text-xs"
              >
                Add Member
              </Button>
              <Button
                type="link"
                href={`/groups/${group.id}/edit`}
                className="!px-0 !text-xs"
              >
                Edit
              </Button>
            </Space>
          </div>
        ),
        classNames: {
          body: "!py-0 !px-2",
        },
        children: (
          <List
            dataSource={group.members}
            renderItem={(contact) => (
              <List.Item className="!py-2">
                <div className="flex w-full justify-between">
                  <Button
                    type="text"
                    href={`/contacts/${contact.id}/edit`}
                    className="flex w-full items-center !justify-between"
                  >
                    <p className="font-semibold">{contact.nickName}</p>
                    <p className="text-xs">{contact.phoneNumber}</p>
                  </Button>
                  <Button
                    type="link"
                    danger
                    className="!px-2 !text-xs"
                    onClick={() => {
                      confirmModal({
                        title: "Remove this Contact?",
                        text: `Are you sure you want to remove ${contact.fullName} from "${group.name}" Group?`,
                        onOk: async () => {
                          handelRemoveMember(contact.id, group.id);
                        },
                        okText: "Remove",
                        danger: true,
                      });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </List.Item>
            )}
          />
        ),
      }))}
    />
  );
}
