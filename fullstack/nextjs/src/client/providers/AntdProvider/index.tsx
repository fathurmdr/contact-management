"use client";

import { ConfigProvider } from "antd";
import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import ConfirmModalProvider from "../ConfirmModalProvider";
import NotificationProvider from "../NotificationProvider";

function AntdProvider({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    );
  });
  return (
    <StyleProvider cache={cache}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1759e9",
          },
        }}
        modal={{
          classNames: {
            content: "!px-0 !py-0 overflow-hidden",
            body: "!px-8 !py-4 border-y border-gray dark:border-graydark min-h-32",
            header: "!px-8 !py-4 !m-0",
            footer: "!px-8 !py-4 !m-0",
          },
          className: "!my-16",
        }}
      >
        <NotificationProvider>
          <ConfirmModalProvider>{children}</ConfirmModalProvider>
        </NotificationProvider>
      </ConfigProvider>
    </StyleProvider>
  );
}

export default AntdProvider;
