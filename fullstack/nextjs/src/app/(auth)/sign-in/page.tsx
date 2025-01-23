"use client";

import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { signIn } from "./action";
import useNotification from "@/client/hooks/useNotification";

export default function SignIn() {
  const { showMessage } = useNotification();
  const router = useRouter();

  async function onSignIn(values: any) {
    const result = await signIn(values);
    if (result?.errorMsg) {
      showMessage.error(result.errorMsg, 5);
    } else {
      showMessage.success("Sign in successfully", 5);
      router.replace("/contacts");
    }
  }

  return (
    <div className="flex min-h-screen w-full max-w-96 items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex w-full flex-col items-center gap-8 sm:items-start">
        <h1 className="w-full text-center text-3xl font-semibold">Sign In</h1>
        <Form
          onFinish={onSignIn}
          className="w-full"
          layout="vertical"
          initialValues={{
            dialCode: "+62",
          }}
        >
          <Form.Item name="email" rules={[{ required: true }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password
              placeholder="Password"
              autoComplete="current-password"
            />
          </Form.Item>
          <Form.Item className="!mb-0 !mt-12 w-full">
            <Button htmlType="submit" type="primary" className="w-full">
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <div className="flex w-full items-center justify-center">
          <p>Does not have an account?</p>
          <Button href="/sign-up" type="link">
            Sign Up
          </Button>
        </div>
      </main>
    </div>
  );
}
