import { Breadcrumb, Button, Empty } from "antd";
import ContactList from "./components/ContactList";
import { ContactType, getContacts } from "./data";

export default async function Contacts() {
  const contacts = await getContacts();

  const groupedContacts: Record<string, ContactType[]> = {};

  contacts.forEach((contact) => {
    const firstLetter = contact.fullName[0].toUpperCase() || "#";
    if (!groupedContacts[firstLetter]) {
      groupedContacts[firstLetter] = [];
    }
    groupedContacts[firstLetter].push(contact);
  });

  return (
    <>
      <div className="mb-6 flex items-center justify-between px-6">
        <Breadcrumb
          items={[
            {
              title: <h1 className="font-semibold">Contacts</h1>,
            },
          ]}
        />
        <Button href="/contacts/add">Add Contact</Button>
      </div>
      {contacts.length > 0 ? (
        <div className="flex-1 overflow-y-auto px-6">
          <ContactList groupedContacts={groupedContacts} />
        </div>
      ) : (
        <div className="px-6 py-20">
          <Empty />
        </div>
      )}
    </>
  );
}
