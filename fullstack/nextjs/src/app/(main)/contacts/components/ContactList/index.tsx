"use client";

import { Button, Collapse, List } from "antd";
import { ContactType } from "../../data";

interface ContactListProps {
  groupedContacts: Record<string, ContactType[]>;
}

export default function ContactList({ groupedContacts }: ContactListProps) {
  const letters = Object.keys(groupedContacts);
  return (
    <Collapse
      defaultActiveKey={letters}
      items={letters.map((letter: string) => ({
        key: letter,
        showArrow: false,
        label: <p className="font-semibold">{letter}</p>,
        classNames: {
          body: "!py-0 !px-2",
        },
        children: (
          <List
            dataSource={groupedContacts[letter]}
            renderItem={(contact) => (
              <List.Item className="!py-2">
                <Button
                  type="text"
                  href={`/contacts/${contact.id}/edit`}
                  className="flex w-full items-center !justify-between"
                >
                  <p className="font-semibold">
                    {contact.nickName
                      ? `${contact.fullName} (${contact.nickName})`
                      : contact.fullName}
                  </p>
                  <p className="text-xs">{contact.phoneNumber}</p>
                </Button>
              </List.Item>
            )}
          />
        ),
      }))}
    />
  );
}
