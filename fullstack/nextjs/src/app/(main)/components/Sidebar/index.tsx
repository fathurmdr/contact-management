"use client";

import { PhoneOutlined, TeamOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      <div className="flex-0 hidden h-full basis-60 flex-col rounded-xl border border-gray-300 bg-gray-50 sm:flex">
        <div className="p-6">
          <h1 className="text-xl font-semibold">Contact Management</h1>
        </div>
        <nav>
          <ul className="flex flex-col gap-2 p-6">
            <li>
              <Link
                href="/contacts"
                title="Contacts"
                className={
                  pathname.includes("/contacts")
                    ? "text-black"
                    : "text-gray-500"
                }
              >
                Contacts
              </Link>
            </li>
            <li>
              <Link
                href="/groups"
                title="Groups"
                className={
                  pathname.includes("/groups") ? "text-black" : "text-gray-500"
                }
              >
                Groups
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <nav className="absolute bottom-0 h-14 w-full rounded-t-xl border sm:hidden">
        <ul className="flex h-full items-center justify-evenly">
          <li>
            <Link
              href="/contacts"
              title="Contacts"
              className={
                pathname.includes("/contacts") ? "text-black" : "text-gray-500"
              }
            >
              <PhoneOutlined className="text-2xl" />
            </Link>
          </li>
          <li>
            <Link
              href="/groups"
              title="Groups"
              className={
                pathname.includes("/groups") ? "text-black" : "text-gray-500"
              }
            >
              <TeamOutlined className="text-2xl" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
