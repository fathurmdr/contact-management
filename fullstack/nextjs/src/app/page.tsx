import { PhoneOutlined } from "@ant-design/icons";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "antd";
import { getAuth } from "@/server/data/auth.data";

export default async function Home() {
  const auth = await getAuth();

  if (auth) {
    redirect("/contacts");
  }

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8">
        <div className="flex items-center gap-2">
          <PhoneOutlined className="text-2xl" />
          <h1 className="text-2xl font-semibold">Contact Management</h1>
        </div>
        <ol className="list-inside list-decimal text-left font-[family-name:var(--font-geist-mono)] text-sm">
          <li className="mb-2">Manage your contacts easly and efficiently.</li>
          <li>Create contact groups to organize your contacts.</li>
        </ol>

        <div className="flex items-center gap-4">
          <Button shape="round" type="primary" href="/sign-in" size="large">
            Sign In
          </Button>
          <Button shape="round" type="default" href="/sign-up" size="large">
            Sign Up
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/fathurmdr/contact-management/fullstack/nextjs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Source Code
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/fathurmdr/contact-management/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Repository
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/fathur208/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          See My LinkedIn →
        </a>
      </footer>
    </div>
  );
}
