"use client";

import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "./action";
import useData from "@/client/hooks/useData";
import useNotification from "@/client/hooks/useNotification";

export default function SignUp() {
  const { showMessage } = useNotification();
  const router = useRouter();

  const { dialCodes, getDialCodes } = useData();

  async function onSignUp(values: any) {
    values.phoneNumber = values.dialCode + "-" + values.phoneNumber;
    const result = await signUp(values);
    if (result?.errorMsg) {
      showMessage.error(result.errorMsg, 5);
    } else {
      showMessage.success("Sign up successfully, please sign in", 5);
      router.replace("/sign-in");
    }
  }

  useEffect(() => {
    getDialCodes();
  }, []);

  return (
    <div className="flex min-h-screen w-full max-w-96 items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex w-full flex-col items-center gap-8 sm:items-start">
        <h1 className="w-full text-center text-3xl font-semibold">Sign Up</h1>
        <Form
          onFinish={onSignUp}
          className="w-full"
          layout="vertical"
          initialValues={{
            dialCode: "+62",
          }}
        >
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input placeholder="Full Name" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[{ required: true }]}
            normalize={(value: string) => {
              if (value.startsWith("0")) {
                return value.replace("0", "");
              }
              return value.replace(/\D/g, "");
            }}
          >
            <Input
              placeholder="Phone Number"
              addonBefore={
                <Form.Item name="dialCode" noStyle rules={[{ required: true }]}>
                  <Select
                    style={{ width: 85 }}
                    notFoundContent={null}
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={dialCodes.map((dialCode) => ({
                      value: dialCode.dial_code,
                      label: dialCode.dial_code,
                      key: dialCode.code,
                    }))}
                  />
                </Form.Item>
              }
            />
          </Form.Item>
          <Form.Item name="bio">
            <Input placeholder="Bio" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password
              placeholder="Password"
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item className="!mb-0 !mt-12 w-full">
            <Button htmlType="submit" type="primary" className="w-full">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div className="flex w-full items-center justify-center">
          <p>Already have an account?</p>
          <Button href="/sign-in" type="link">
            Sign In
          </Button>
        </div>
      </main>
    </div>
  );
}
