"use client";

import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import useAuth from "@/client/hooks/useAuth";
import { signOut } from "@/server/action/auth.action";

export default function HeaderProfile() {
  const { user } = useAuth();

  return (
    <div className="mb-6 flex justify-end px-8">
      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        menu={{
          items: [
            {
              key: "1",
              label: "Sign Out",
              icon: <LogoutOutlined className="!text-base" />,
              onClick: () => signOut(),
            },
          ],
        }}
      >
        <Space size={16} className="cursor-pointer">
          <Space direction="vertical" size={0}>
            <p>{user.name}</p>
            <p className="text-xs">{user.bio}</p>
          </Space>
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  );
}
