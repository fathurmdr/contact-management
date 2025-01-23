import { Breadcrumb, Space } from "antd";
import { notFound } from "next/navigation";
import { updateGroup } from "../../action";
import { getGroup } from "../../data";
import GroupForm from "../../components/GroupForm";
import DeleteGroup from "./components/DeleteGroup";
import BackButton from "@/client/components/BackButton";

export default async function EditGroup({
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
              title: <h1 className="font-semibold">{group.name}</h1>,
            },
          ]}
        />
        <Space>
          <BackButton />
          <DeleteGroup groupId={groupId} />
        </Space>
      </div>
      <div className="overflow-y-auto p-6">
        <GroupForm id={groupId} initialValues={group} onSubmit={updateGroup} />
      </div>
    </>
  );
}
