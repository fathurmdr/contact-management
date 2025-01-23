import { Breadcrumb } from "antd";
import ContactForm from "../components/ContactForm";
import { addContact } from "../action";
import BackButton from "@/client/components/BackButton";

export default async function AddContact() {
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
              title: <h1 className="font-semibold">Add</h1>,
            },
          ]}
        />
        <BackButton />
      </div>
      <div className="overflow-y-auto p-6">
        <ContactForm onSubmit={addContact} />
      </div>
    </>
  );
}
