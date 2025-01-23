import { Breadcrumb, Space } from "antd";
import { notFound } from "next/navigation";
import { getGroup } from "../../data";
import AddMemberForm from "./components/AddMemberForm";
import { getContacts } from "@/app/(main)/contacts/data";
import BackButton from "@/client/components/BackButton";

export default async function AddMember({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const groupId = Number((await params).id);

  if (isNaN(groupId)) {
    notFound();
  }

  const group = await getGroup(groupId);

  if (!group) {
    notFound();
  }

  let contacts = await getContacts();

  contacts = contacts.filter(
    (contact) => !group.members.find((member) => member.id === contact.id),
  );

  return (
    <>
      <div className="mb-6 flex items-center justify-between px-6">
        <Breadcrumb
          separator={<p className="font-semibold">/</p>}
          items={[
            {
              title: (
                <a href="/groups" className="font-semibold">
                  Groups
                </a>
              ),
            },
            {
              title: (
                <h1 className="font-semibold">{group.name} / Add Member</h1>
              ),
            },
          ]}
        />
        <Space>
          <BackButton />
        </Space>
      </div>
      <div className="overflow-y-auto p-6">
        <AddMemberForm id={groupId} contacts={contacts} />
      </div>
    </>
  );
}
