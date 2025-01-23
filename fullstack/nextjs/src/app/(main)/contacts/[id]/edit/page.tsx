import { Breadcrumb, Button, Space } from "antd";
import { notFound } from "next/navigation";
import { PhoneOutlined } from "@ant-design/icons";
import { updateContact } from "../../action";
import { getContact } from "../../data";
import ContactForm from "../../components/ContactForm";
import DeleteContact from "./components/DeleteContact";
import BackButton from "@/client/components/BackButton";

export default async function EditContact({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const contactId = Number((await params).id);

  if (isNaN(contactId)) {
    notFound();
  }

  const contact = await getContact(contactId);

  if (!contact) {
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
                <a href="/contacts" className="font-semibold">
                  Contacts
                </a>
              ),
            },
            {
              title: <h1 className="font-semibold">{contact.fullName}</h1>,
            },
          ]}
        />
        <Space>
          <BackButton />
          <DeleteContact contactId={contactId} />
        </Space>
      </div>
      <Space className="px-6">
        <Button
          type="primary"
          href={`tel:${contact.phoneNumber}`}
          target="_blank"
          icon={<PhoneOutlined />}
        >
          Call
        </Button>
        <Button
          href={`https://wa.me/${contact.phoneNumber.replace(/\D/g, "")}`}
          target="_blank"
          icon={<PhoneOutlined />}
        >
          Whatsapp
        </Button>
      </Space>
      <div className="overflow-y-auto p-6">
        <ContactForm
          id={contactId}
          initialValues={contact}
          onSubmit={updateContact}
        />
      </div>
    </>
  );
}
