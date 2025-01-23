"use client";

import { Button, ButtonProps } from "antd";
import { useRouter } from "next/navigation";

export default function BackButton(props: ButtonProps) {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} {...props}>
      {props.children ? props.children : "Back"}
    </Button>
  );
}
