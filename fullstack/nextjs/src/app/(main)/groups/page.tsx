import { Breadcrumb, Button, Empty } from "antd";
import GroupList from "./components/GroupList";
import { getGroups } from "./data";

export default async function Groups() {
  const groups = await getGroups();

  return (
    <>
      <div className="mb-6 flex items-center justify-between px-6">
        <Breadcrumb
          items={[
            {
              title: <h1 className="font-semibold">Groups</h1>,
            },
          ]}
        />
        <Button href="/groups/add">Add Group</Button>
      </div>
      {groups.length > 0 ? (
        <div className="flex-1 overflow-y-auto px-6">
          <GroupList groups={groups} />
        </div>
      ) : (
        <div className="px-6 py-20">
          <Empty />
        </div>
      )}
    </>
  );
}
