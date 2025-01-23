"use client";

import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/server/action/auth.action";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex-0 flex h-full basis-60 flex-col rounded-xl border border-gray-300 bg-gray-50">
      <div className="p-6">
        <h1 className="text-xl font-semibold">Contact Management</h1>
      </div>
      <nav>
        <ul className="flex flex-col gap-2 p-6">
          <li>
            <Link
              href="/contacts"
              className={
                pathname.includes("/contacts") ? "text-black" : "text-gray-500"
              }
            >
              Contacts
            </Link>
          </li>
          <li>
            <Link
              href="/groups"
              className={
                pathname.includes("/groups") ? "text-black" : "text-gray-500"
              }
            >
              Groups
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex flex-1 flex-col items-end justify-end p-6">
        <Button onClick={signOut}>Logout</Button>
      </div>
    </div>
  );
}
