"use client";

import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import { Fragment, useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { ContactType } from "../../data";
import useData from "@/client/hooks/useData";
import useNotification from "@/client/hooks/useNotification";

interface ContactFormProps {
  id?: number;
  initialValues?: ContactType;
  onSubmit: (
    values: any,
    id?: number,
  ) => Promise<{ errorMsg: string } | undefined>;
}

export default function ContactForm({
  id,
  initialValues,
  onSubmit,
}: ContactFormProps) {
  const { showNotification } = useNotification();
  const router = useRouter();

  const { dialCodes, getDialCodes } = useData();

  async function handleSubmit(values: any) {
    values.phoneNumber = values.dialCode + "-" + values.phoneNumber;
    const result = await onSubmit(values, id);
    if (result?.errorMsg) {
      showNotification.error({
        message: "Error",
        description: result.errorMsg,
      });
    } else {
      showNotification.success({
        message: "Success",
        description: "Contact saved successfully",
      });
      router.push("/contacts");
    }
  }

  useEffect(() => {
    getDialCodes();
  }, []);
  return (
    <Form
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={
        initialValues
          ? {
              ...initialValues,
              dialCode: initialValues?.phoneNumber.split("-")[0],
              phoneNumber: initialValues?.phoneNumber.split("-")[1],
            }
          : {
              dialCode: "+62",
            }
      }
    >
      <Form.Item name="fullName" rules={[{ required: true }]}>
        <Input placeholder="Full Name" />
      </Form.Item>
      <Form.Item name="nickName">
        <Input placeholder="Nick Name" />
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
      <Form.Item name="email" className="!mb-12">
        <Input placeholder="Email" />
      </Form.Item>
      <Form.List name="addresses">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Fragment key={key}>
                <Row className="mb-2 flex" align="middle" gutter={[16, 16]}>
                  <Col span={1}>
                    <Typography.Text className="mb-7 block text-nowrap">
                      {index + 1 + "."}
                    </Typography.Text>
                  </Col>
                  <Col span={20}>
                    <Form.Item
                      {...restField}
                      className="w-full"
                      name={[name, "street"]}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Street" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="mb-2 flex" align="middle" gutter={[16, 16]}>
                  <Col offset={1} span={10}>
                    <Form.Item
                      {...restField}
                      className="w-full"
                      name={[name, "city"]}
                    >
                      <Input placeholder="City" />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      {...restField}
                      className="w-full"
                      name={[name, "district"]}
                    >
                      <Input placeholder="District" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="mb-2 flex" align="middle" gutter={[16, 16]}>
                  <Col offset={1} span={10}>
                    <Form.Item
                      {...restField}
                      className="w-full"
                      name={[name, "subDistrict"]}
                    >
                      <Input placeholder="Sub District" />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      {...restField}
                      className="w-full"
                      name={[name, "postalCode"]}
                      normalize={(value: string) => {
                        return value.replace(/\D/g, "");
                      }}
                    >
                      <Input placeholder="Postal Code" />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      className="mb-7"
                    />
                  </Col>
                </Row>
              </Fragment>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Address
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item className="!mt-16 w-full">
        <Button htmlType="submit" type="primary" className="w-full">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
