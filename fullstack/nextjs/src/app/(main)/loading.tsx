"use client";

import { Spin } from "antd";

export default function Loading() {
  return <Spin fullscreen size="large" spinning={true} />;
}
